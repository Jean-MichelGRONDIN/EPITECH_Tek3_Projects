/*
** EPITECH PROJECT, 2020
** opus_test
** File description:
** Compressor
*/

#ifndef COMPRESSOR_HPP_
#define COMPRESSOR_HPP_

class ICompressor {
    public:
        virtual int decode(QByteArray &input, int16_t *output,
            unsigned long &frameCount) = 0;
        virtual int encode(QByteArray &input, int16_t *output,
            unsigned long &frameCount) = 0;
};

#endif /* !COMPRESSOR_HPP_ */