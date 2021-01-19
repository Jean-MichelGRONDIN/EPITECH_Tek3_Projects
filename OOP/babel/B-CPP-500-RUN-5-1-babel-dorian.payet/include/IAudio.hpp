/*
** EPITECH PROJECT, 2020
** opus_test
** File description:
** Audio
*/

#ifndef AUDIO_HPP_
#define AUDIO_HPP_

#include <QObject>

class IAudio: public QObject {
    public:
        virtual bool CreateStreams(void) = 0;
        virtual bool StartStreams(void) = 0;
        virtual void DestroyStreams(void) = 0;
        virtual void StopStreams(void) = 0;
        virtual void setToPlay(QByteArray toAdd) = 0;

    protected:
    private:
};

#endif /* !AUDIO_HPP_ */
