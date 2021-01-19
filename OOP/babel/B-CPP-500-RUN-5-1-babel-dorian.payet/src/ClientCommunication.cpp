/*
** EPITECH PROJECT, 2020
** client
** File description:
** client
*/

#include "ClientCommunication.hpp"
#include "Datagram.hpp"
#include <iostream>

ClientCommunication::ClientCommunication(QHostAddress *address, quint16 *port)
{
    // _udpSocket = new QUdpSocket();
    // _udpSocket->bind(45457);
    // this->ipDest = address;
    // this->portDest = port;
}

ClientCommunication::~ClientCommunication()
{
}

QHostAddress *ClientCommunication::getIpDest()
{
    return (ipDest);
}

quint16 *ClientCommunication::getPortDest()
{
    return (portDest);
}

QNetworkDatagram ClientCommunication::readDatagram()
{
    return (this->_udpSocket->receiveDatagram());
}

void ClientCommunication::sendDatagram(Datagram &datagram)
{
    if (this->_udpSocket->writeDatagram(datagram._data) == -1)
        std::cout << "ERROR" << std::endl;
    else
        std::cout << "PAS D'ERREUR" << std::endl;
}

QUdpSocket *ClientCommunication::getSocketUdp()
{
    return (_udpSocket);
}