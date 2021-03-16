/*
** EPITECH PROJECT, 2020
** factory
** File description:
** factory
*/

#ifndef __factorydatagram__
#define __factorydatagram__

#include "Datagram.hpp"

class DatagramFactory {
    public:
        virtual ~DatagramFactory(){};
        virtual Datagram* factoryMethod() const = 0;

    protected:
    private:
};

#endif /* !__factorydatagram__ */
