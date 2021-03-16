/*
** EPITECH PROJECT, 2020
** opus_test
** File description:
** Audio
*/

#ifndef PORTAUDIO_HPP_
#define PORTAUDIO_HPP_

// #include <stdio.h>
// #include <stdlib.h>
// #include <iostream>
// #include <fstream>
// #include <error.h>
#include <QList>
#include <QByteArray>
#include <QObject>

#include <string>
#include "portaudio.h"

#include "ICompressor.hpp"
#include "AudioDataContainer.hpp"
#include "MyError.hpp"

#define PA_INITIALIZE                "PortAudio Initialization"
#define PA_OPEN_RECORD_STREAM        "PortAudio Open Record Streal"
#define PA_OPEN_PLAY_STREAM          "PortAudio Open Play Streal"
#define PA_START_RECORD              "PortAudio Start Recording"
#define PA_START_PLAY                "PortAudio Start Playing"

#define MIN_LATENCY (0.1)

#include "IAudio.hpp"

class PortAudio : public IAudio {
    Q_OBJECT

    public:
        PortAudio();
        ~PortAudio();
        bool InitPortAudio(void);
        bool OpenRecordStream(void);
        bool OpenPlayStream(void);
        void CloseRecordStream(void);
        void ClosePlayStream(void);
        bool StartRecordStream(void);
        bool StartPlayStream(void);
        void StopRecordStream(void);
        void StopPlayStream(void);
        bool CreateStreams(void);
        bool StartStreams(void);
        void DestroyStreams(void);
        void StopStreams(void);
        void setToPlay(QByteArray toAdd);

    signals:
        void signalSoundReadyToSend(QByteArray);

    protected:
    private:
        PaError _err;
        PaStream* _record;
        PaStream* _stream;
        QList<QByteArray> _data;
        QList<QByteArray> _dataToPlay;
        ICompressor *_compressor;
        AudioDataContainer *_playContainer;
        AudioDataContainer *_recordContainer;
};

#endif /* !PORTAUDIO_HPP_ */