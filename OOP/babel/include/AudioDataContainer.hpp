/*
** EPITECH PROJECT, 2020
** opus_test
** File description:
** AudioDataContainer
*/

#ifndef AUDIODATACONTAINER_HPP_
#define AUDIODATACONTAINER_HPP_

#include <QList>
#include <QByteArray>

#include "IAudio.hpp"
#include "ICompressor.hpp"

class AudioDataContainer {
    public:
        AudioDataContainer(QList<QByteArray> *data, ICompressor *compressor, IAudio *portAudio);
        ~AudioDataContainer();
        QList<QByteArray> *getData() const;
        ICompressor *getCompressor() const;
        IAudio *getPortAudio() const;

    protected:
    private:
        QList<QByteArray> *_data;
        ICompressor *_compressor;
        IAudio *_portAudio;
};

#endif /* !AUDIODATACONTAINER_HPP_ */