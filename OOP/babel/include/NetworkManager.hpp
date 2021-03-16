/*
** EPITECH PROJECT, 2020
** network
** File description:
** network
*/

#ifndef __networkmanager__
#define __networkmanager__

#include "Datagram.hpp"
#include "ClientCommunication.hpp"
#include "IAudio.hpp"
#include <iostream>
#include <unordered_map>


class NetworkManager : public QObject {
    Q_OBJECT
    typedef void (NetworkManager::*getMethodPacket)(QNetworkDatagram);
    typedef std::pair<Datagram::PackageType, Datagram::PackageOption> PackageInfo;
    public:
        NetworkManager();
        ~NetworkManager();
        void setCurrentCallInfoMate(QHostAddress ip, quint16 port);
        void sendAskSoundPacket(QHostAddress ip, quint16 port);
        void sendAskChatPacket(QHostAddress ip, quint16 port);
        void sendMessageToClient(QHostAddress ip, quint16 port, QString mes);
        void sendAcceptedChatPacket(QHostAddress ip, quint16 port);
        void sendAcceptedSoundPacket(QHostAddress ip, quint16 port);
        void getDataChatPacket(QNetworkDatagram data);
        void getAskChatPacket(QNetworkDatagram data);
        void getAcceptedChatPacket(QNetworkDatagram data);
        void getRejectedChatPacket(QNetworkDatagram data);
        void getDataSoundPacket(QNetworkDatagram data);
        void getAskSoundPacket(QNetworkDatagram data);
        void getAcceptedSoundPacket(QNetworkDatagram data);
        void getRejectedSoundPacket(QNetworkDatagram data);
        void getDataVideoPacket(QNetworkDatagram data);
        void getAskVideoPacket(QNetworkDatagram data);
        void getAcceptedVideoPacket(QNetworkDatagram data);
        void getRejectedVideoPacket(QNetworkDatagram data);
        ClientCommunication *getClientCommunication();

    public:
        QNetworkDatagram readDatagram();
        void sendDatagram(QNetworkDatagram);
        QUdpSocket *getSocketUdp();
        QHostAddress getIpName(std::string name);
        QUdpSocket *_udpSocket;
        IAudio *_audio;
        QByteArray soundToPlay;
        QHostAddress _currentCallIpMate;
        quint16 _currentCallPortMate;

    signals:
        void signalReceiveMessage(QHostAddress, int, QString);
        void signalSendMessage(QHostAddress, int, QString);
        void signalGetAskSoundPacket(QHostAddress, int);
        void signalGetAskChatPacket(QHostAddress, int);
        void signalGetAcceptedChatPacket(QHostAddress, int);
        void signalGetAcceptedSoundPacket(QHostAddress, int);
        void signalGetRejectedSoundPacket();

    public slots:
        void sendSoundToClient(/*QHostAddress ip, quint16 port, */ QByteArray arr);

        void analysePacket();

    private:
        ClientCommunication *_socket;
        // std::map<Datagram::PackageType, getMethodPacket> _mapMethod;
        std::map<std::pair<int, int>, getMethodPacket> _mapMethod;
        std::map<std::string, QHostAddress> _mapNameIp;
};


#endif /* !__networkmanager__ */
