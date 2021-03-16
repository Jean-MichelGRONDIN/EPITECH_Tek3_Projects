/*
** EPITECH PROJECT, 2020
** opus_test
** File description:
** AudioDataContainer
*/

#include "AudioDataContainer.hpp"

AudioDataContainer::AudioDataContainer(QList<QByteArray> *data, ICompressor *compressor, IAudio *portAudio) : _data(data), _compressor(compressor), _portAudio(portAudio)
{
}

AudioDataContainer::~AudioDataContainer()
{
}

QList<QByteArray> *AudioDataContainer::getData() const
{
    return (_data);
}

ICompressor *AudioDataContainer::getCompressor() const
{
    return (_compressor);
}

IAudio *AudioDataContainer::getPortAudio() const
{
    return (_portAudio);
}
