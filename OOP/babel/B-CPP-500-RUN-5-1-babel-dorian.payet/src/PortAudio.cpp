/*
** EPITECH PROJECT, 2020
** opus_test
** File description:
** Audio
*/

#include "PortAudio.hpp"
#include "Opus.hpp"
#include "AudioDataContainer.hpp"

#include <iostream>

static int PlayCallBack(const void *, void *outputBuffer,
                        unsigned long frameCount,
                        const PaStreamCallbackTimeInfo* , PaStreamCallbackFlags,
                        void *userData) {

    AudioDataContainer *userDataTwo = static_cast<AudioDataContainer *>(userData);
    QList<QByteArray> *audioData = userDataTwo->getData();
    int16_t *data = (int16_t *) outputBuffer;

    if (audioData->isEmpty ()) {
        for (unsigned long i = 0; i < frameCount; ++i, ++data) {
            *data = SAMPLE_SILENCE;
        }
        return paContinue;
    }

    QByteArray audio  = audioData->takeFirst();

    int error = userDataTwo->getCompressor()->decode(audio, data, frameCount);
    // int error = opus_decode ( decoder, ( unsigned char * )audio.data (), audio.size () * 2, data, frameCount, 0 );

    if (error < 0) {
        for (unsigned long i = 0; i < frameCount; ++i, ++data) {
            *data = SAMPLE_SILENCE;
        }
    }
    //delete audiodataocntainer
    return paContinue;
}

static int RecordCallBack(const void *inputBuffer, void *,
                          unsigned long frameCount,
                          const PaStreamCallbackTimeInfo* ,
                          PaStreamCallbackFlags ,
                          void *userData) {
    int16_t *data = (int16_t *) inputBuffer;
    QByteArray audio;
    audio.resize (frameCount * 2);

    AudioDataContainer *userDataTwo = static_cast<AudioDataContainer *>(userData);

    int encoded = userDataTwo->getCompressor()->encode(audio, data, frameCount);
    // int encoded = opus_encode (encoder, data, frameCount, (unsigned char *)audio.data (), audio.size () * 2);

    if (encoded <= 0) {
        return paContinue;
    }
    // QList<QByteArray> *audioData = userDataTwo->getData();
    audio.resize(encoded);
    PortAudio *portaudio = dynamic_cast<PortAudio *>(userDataTwo->getPortAudio());
    portaudio->emit signalSoundReadyToSend(audio);
    // audioData->append(audio);
    //delete audiodataocntainer
    return paContinue;
}

PortAudio::PortAudio() : _compressor(nullptr),
    _recordContainer(nullptr),
    _playContainer(nullptr)
{
    _compressor = new Opus();
    InitPortAudio();
    CreateStreams();
}

PortAudio::~PortAudio()
{
    StopStreams();
    DestroyStreams();
    delete _compressor;
}

bool PortAudio::InitPortAudio(void) {
    _err = Pa_Initialize();
    if (_err != paNoError) {
        throw MyError(PA_INITIALIZE, "Failed to initialize portaudio");
        return false;
    }
    return true;
}

bool PortAudio::OpenRecordStream(void) {
    // _err = Pa_OpenDefaultStream(&_record, 1, 0, AUDIO_TYPE, SAMPLE_RATE,
    //     BUFFER_SIZE, RecordCallBack, &_data);

    // _recordContainer = new AudioDataContainer(&_data, _compressor, this);
    PaDeviceIndex       index   = Pa_GetDefaultInputDevice ();
    const PaDeviceInfo  *info   = Pa_GetDeviceInfo ( index );

    if ( !info ) {

        throw MyError(PA_OPEN_PLAY_STREAM, "infosrecord");
        return false;
    }

    if ( info->maxInputChannels == 0 ) {

        throw MyError(PA_OPEN_PLAY_STREAM, "maxinputchannelsrecord");
        return false;
    }

    PaStreamParameters params;
    {
        params.device                    = Pa_HostApiDeviceIndexToDeviceIndex( info->hostApi, index );
        params.channelCount              = CHANNELS;
        params.sampleFormat              = AUDIO_TYPE;
        params.suggestedLatency          = MIN_LATENCY;
        params.hostApiSpecificStreamInfo = nullptr;
    }

    // Открываем стрим
    PaError errorOpenStream = Pa_OpenStream(
                &_record
                ,&params
                ,nullptr
                ,SAMPLE_RATE
                ,BUFFER_SIZE
                ,paClipOff
                ,RecordCallBack
                ,(new AudioDataContainer(&_data, _compressor, this))
                );

    if ( errorOpenStream != paNoError ) {

        throw MyError(PA_OPEN_PLAY_STREAM, "erroropenstream");
        return false;
    }

    return true;

    // _recordContainer = new AudioDataContainer(&_data, _compressor);
    // _err = Pa_OpenDefaultStream(&_record, 1, 0, AUDIO_TYPE, SAMPLE_RATE,
    //     BUFFER_SIZE, RecordCallBack, _recordContainer);
    // if (_err != paNoError) {
    //     throw MyError(PA_OPEN_RECORD_STREAM, "Failed to open record stream");
    // }
    // return true;
}

bool PortAudio::OpenPlayStream(void) {
    // _err = Pa_OpenDefaultStream(&_stream,0, 1, AUDIO_TYPE, SAMPLE_RATE,
    //     BUFFER_SIZE, PlayCallBack, &_data);

    // _playContainer = new AudioDataContainer(&_dataToPlay, _compressor, this);
    PaDeviceIndex       index   = Pa_GetDefaultOutputDevice ();
    const PaDeviceInfo  *info   = Pa_GetDeviceInfo ( index );

    if ( !info ) {

        throw MyError(PA_OPEN_PLAY_STREAM, "infos");
        return false;
    }

    if ( info->maxOutputChannels == 0 ) {

        throw MyError(PA_OPEN_PLAY_STREAM, "maxoutputchannel");
        return false;
    }

    PaStreamParameters params;
    {
        params.device                    = Pa_HostApiDeviceIndexToDeviceIndex( info->hostApi, index );
        params.channelCount              = CHANNELS;
        params.sampleFormat              = AUDIO_TYPE;
        params.suggestedLatency          = MIN_LATENCY;
        params.hostApiSpecificStreamInfo = nullptr;
    }

    PaError errorOpenStream = Pa_OpenStream(
            &_stream
            ,nullptr
            ,&params
            ,SAMPLE_RATE
            ,BUFFER_SIZE
            ,paClipOff
            ,PlayCallBack
            ,(new AudioDataContainer(&_dataToPlay, _compressor, this))
            );

    if ( errorOpenStream != paNoError ) {
        throw MyError(PA_OPEN_PLAY_STREAM, "Failed to open play stream");
        return false;
    }

    return true;
}


//     _playContainer = new AudioDataContainer(&_data, _compressor);
//     _err = Pa_OpenDefaultStream(&_stream,0, 1, AUDIO_TYPE, SAMPLE_RATE,
//         BUFFER_SIZE, PlayCallBack, _playContainer);
//     if (_err != paNoError) {
//         throw MyError(PA_OPEN_PLAY_STREAM, "Failed to open play stream");
//     }
//     return true;
// }

void PortAudio::CloseRecordStream(void) {
    if (_record) {
        Pa_CloseStream(_record);
        _record = nullptr;
    }
}

void PortAudio::ClosePlayStream(void) {
    if (_stream) {
        Pa_CloseStream(_stream);
        _stream = nullptr;
    }
}

bool PortAudio::StartRecordStream(void) {
    _err = Pa_StartStream(_record);
    if (_err != paNoError) {
        throw MyError(PA_START_RECORD, "Failed to start recording");
        return false;
    }
    return true;
}

bool PortAudio::StartPlayStream(void) {
    _err = Pa_StartStream(_stream);
    if (_err != paNoError) {
        throw MyError(PA_START_PLAY, "Failed to start playing");
        return false;
    }
    return true;
}

void PortAudio::StopRecordStream(void) {
    if (_record) {
        Pa_StopStream(_record);
    }
}

void PortAudio::StopPlayStream(void) {
    if (_stream) {
        Pa_StopStream(_stream);
    }
}

bool PortAudio::CreateStreams(void) {
    if (!OpenPlayStream()) {
        return false;
    }
    if (!OpenRecordStream()) {
        ClosePlayStream();
        return false;
    }
    return true;
}

bool PortAudio::StartStreams(void) {
    if (!StartPlayStream()) {
        return false;
    }
    if (!StartRecordStream()) {
        StopRecordStream();
        return false;
    }
    return true;
}

void PortAudio::DestroyStreams(void) {
    ClosePlayStream();
    CloseRecordStream();
}

void PortAudio::StopStreams(void) {
    StopPlayStream();
    StopRecordStream();
}

void PortAudio::setToPlay(QByteArray toAdd)
{
    _dataToPlay.append(toAdd);
}
