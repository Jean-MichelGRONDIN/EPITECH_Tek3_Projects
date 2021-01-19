/*
** EPITECH PROJECT, 2020
** babel
** File description:
** ClientCommunication
*/

#ifndef __clientcom__
#define __clientcom__

#include <QUdpSocket>
#include "Datagram.hpp"
#include <QObject>

class ClientCommunication : public QObject {
    public:
        ClientCommunication(QHostAddress *address = Q_NULLPTR, quint16 *port = Q_NULLPTR);
        ~ClientCommunication();
        QNetworkDatagram readDatagram();
        void sendDatagram(Datagram &datagram);
        QUdpSocket *getSocketUdp();
        QHostAddress *getIpDest();
        quint16 *getPortDest();
    private:
        QUdpSocket *_udpSocket;
        QHostAddress *ipDest;
        quint16 *portDest;
};

#endif /* !__client__ */
