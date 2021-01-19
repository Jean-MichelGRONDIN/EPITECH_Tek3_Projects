/*
** EPITECH PROJECT, 2020
** opus_test
** File description:
** Opus
*/

#include "Opus.hpp"

Opus::Opus() : _encoderError(0), _decoderError(0),
    _decoder(nullptr), _encoder(nullptr)
{
    // Create
    _decoder = opus_decoder_create(SAMPLE_RATE, 1, &_decoderError);
    _encoder = opus_encoder_create(SAMPLE_RATE, 1, APPLICATION, &_encoderError);
    // Create-end

    // Error creat decoder
    if (!_decoder)
        throw MyError(DECODER_CREATE, "Fail in creating opus decoder");
    // Error creat decoder - end

    // Error creat encoder
    if (!_encoder)
        throw MyError(ENCODER_CREATE, "Fail in creating opus encoder");
    // Error creat encoder - end

    // Init
    _decoderError = opus_decoder_init(_decoder, SAMPLE_RATE, 1);
    _encoderError = opus_encoder_init(_encoder, SAMPLE_RATE, 1, APPLICATION);
    // Init-end

    // Error creat decoder
    if (_decoderError != OPUS_OK)
        throw MyError(DECODER_INIT, "Fail in initializing opus decoder");
    // Error creat decoder - end

    // Error creat encoder
    if (_encoderError != OPUS_OK)
        throw MyError(ENCODER_INIT, "Fail in initializing opus encoder");
    // Error creat encoder - end

    // Encoder ctl
    _encoderError = opus_encoder_ctl(_encoder, OPUS_SET_BITRATE(BITRATE));
    // Encoder ctl - end

    // Error encoder ctl
    if (_encoderError != OPUS_OK)
        throw MyError(ENCODER_CTL, "Fail in setting encoder bitrate");
    // Error encoder ctl - end
}

Opus::~Opus()
{
    if (_decoder)
        opus_decoder_destroy(_decoder);
    if (_encoder)
        opus_encoder_destroy(_encoder);
}

int Opus::decode(QByteArray &input, int16_t *output, unsigned long &frameCount)
{
    int err = opus_decode(_decoder, (unsigned char *)input.data(),
        input.size() * 2, output, frameCount, 0);
    return (err);
}

int Opus::encode(QByteArray &input, int16_t *output, unsigned long &frameCount)
{
    int err = opus_encode(_encoder, output, frameCount,
        (unsigned char *)input.data(), input.size() * 2);
    return (err);
}