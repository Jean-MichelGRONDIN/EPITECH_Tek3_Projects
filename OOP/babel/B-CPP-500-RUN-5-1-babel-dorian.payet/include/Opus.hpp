/*
** EPITECH PROJECT, 2020
** opus_test
** File description:
** Compressor
*/

#ifndef OPUS_HPP_
#define OPUS_HPP_

#include <QList>
#include <QByteArray>

#include <opus.h>
#include <opus_types.h>

#define SAMPLE_RATE          48000
#define APPLICATION          OPUS_APPLICATION_AUDIO
#define BITRATE              16000
#define AUDIO_TYPE           paInt16
#define CHANNELS             1
#define BUFFER_SIZE          960
#define SAMPLE_SILENCE       (0)



#include "MyError.hpp"

#define DECODER_CREATE       "Decoder creation"
#define ENCODER_CREATE       "Encoder creation"

#define DECODER_INIT         "Decoder Initialization"
#define ENCODER_INIT         "Encoder Initialization"

#define ENCODER_CTL          "Encoder CTL"

#include "ICompressor.hpp"

class Opus : public ICompressor {
    public:
        Opus();
        ~Opus();
        int decode(QByteArray &input, int16_t *output,
            unsigned long &frameCount);
        int encode(QByteArray &input, int16_t *output,
            unsigned long &frameCount);

    protected:
    private:
        int _encoderError;
        int _decoderError;
        OpusDecoder *_decoder;
        OpusEncoder *_encoder;
};

#endif /* !OPUS_HPP_ */