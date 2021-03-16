/*
** EPITECH PROJECT, 2020
** network
** File description:
** network
*/

#include "NetworkManager.hpp"
#include "Datagram.hpp"
#include "chattab.h"
#include "PortAudio.hpp"
#include <unistd.h>

NetworkManager::NetworkManager()
{
    this->_mapMethod.insert({{Datagram::PackageType::CHAT, Datagram::PackageOption::DATA}, &NetworkManager::getDataChatPacket});
    this->_mapMethod.insert({{Datagram::PackageType::CHAT, Datagram::PackageOption::ASK}, &NetworkManager::getAskChatPacket});
    this->_mapMethod.insert({{Datagram::PackageType::CHAT, Datagram::PackageOption::ACCEPTED}, &NetworkManager::getAcceptedChatPacket});
    this->_mapMethod.insert({{Datagram::PackageType::CHAT, Datagram::PackageOption::REJECTED}, &NetworkManager::getRejectedChatPacket});
    this->_mapMethod.insert({{Datagram::PackageType::SOUND, Datagram::PackageOption::DATA}, &NetworkManager::getDataSoundPacket});
    this->_mapMethod.insert({{Datagram::PackageType::SOUND, Datagram::PackageOption::ASK}, &NetworkManager::getAskSoundPacket});
    this->_mapMethod.insert({{Datagram::PackageType::SOUND, Datagram::PackageOption::ACCEPTED}, &NetworkManager::getAcceptedSoundPacket});
    this->_mapMethod.insert({{Datagram::PackageType::SOUND, Datagram::PackageOption::REJECTED}, &NetworkManager::getRejectedSoundPacket}); 
    this->_mapMethod.insert({{Datagram::PackageType::VIDEO, Datagram::PackageOption::DATA}, &NetworkManager::getDataVideoPacket});
    this->_mapMethod.insert({{Datagram::PackageType::VIDEO, Datagram::PackageOption::ASK}, &NetworkManager::getAskVideoPacket});
    this->_mapMethod.insert({{Datagram::PackageType::VIDEO, Datagram::PackageOption::ACCEPTED}, &NetworkManager::getAcceptedVideoPacket});
    this->_mapMethod.insert({{Datagram::PackageType::VIDEO, Datagram::PackageOption::REJECTED}, &NetworkManager::getRejectedVideoPacket});
    // this->_socket = new ClientCommunication(new QHostAddress(ip), new quint16(port.toInt()));
    this->_audio = new PortAudio();
    // 10.106.0.83 : Romain
    // 10.106.0.70 : Anthony
    this->_mapNameIp.insert({std::string("France"), QHostAddress(tr("10.106.1.123"))});
    // this->_mapNameIp.insert(std::string("Anthony"), QHostAddress(tr("10.106.0.70")));

    // NEWNEWNEW
    _udpSocket = new QUdpSocket();
    _udpSocket->bind(45457);

    connect(this->_udpSocket, SIGNAL(readyRead()), this, SLOT(analysePacket()));
    connect(this->_audio, SIGNAL(signalSoundReadyToSend(QByteArray)), this, SLOT(sendSoundToClient(QByteArray)));
}

NetworkManager::~NetworkManager()
{
}

QNetworkDatagram NetworkManager::readDatagram()
{
    return (_udpSocket->receiveDatagram());
}

QHostAddress NetworkManager::getIpName(std::string name)
{
    return (this->_mapNameIp[name]);
}

void NetworkManager::sendDatagram(QNetworkDatagram datagram)
{
    std::cout << "J'ENVOIIIIII UN PACKEEEETTTTTTTT" << std::endl;
    std::cout << "DATAGRAM: type: " << datagram.data().at(0) + 0 << " port: " << datagram.data().at(1) + 0 << std::endl;
    if (_udpSocket->writeDatagram(datagram) == -1)
        std::cout << "[NETWORK MANAGER] ERROR" << std::endl;
    else
        std::cout << "[NETWORK MANAGER] BIEN ENVOYÉ" << std::endl;
}

QUdpSocket *NetworkManager::getSocketUdp()
{
    return (_udpSocket);
}


ClientCommunication *NetworkManager::getClientCommunication()
{
    return (_socket);
}

void NetworkManager::sendMessageToClient(QHostAddress ip, quint16 port, QString mes)
{
    Datagram datagram(Datagram::PackageType::CHAT, Datagram::PackageOption::DATA);
    QByteArray test;
    QByteArray arr = mes.toUtf8();
    
    test = datagram.getData().data();
    std::cout << "[SEND MESSAGE TO CLIENT] type: " << test.at(0) << " port: " << test.at(1) << std::endl;
    datagram.setIpPort(ip, port);
    datagram.appendData(arr);
    test = datagram.getData().data();
    std::cout << "[SEND MESSAGE TO CLIENT] type: " << test.at(0) << " port: " << test.at(1) << std::endl;
    // this->_socket->sendDatagram(datagram);
    this->sendDatagram(datagram.getData());
}

// J'ai retirer car je vais utiliser les current audio mate ip et port
void NetworkManager::sendSoundToClient(/*QHostAddress ip, quint16 port, */QByteArray arr)
{
    Datagram datagram(Datagram::PackageType::SOUND, Datagram::PackageOption::DATA);

    std::cout << "Send sound chat packet" << std::endl;
    datagram.setIpPort(this->_currentCallIpMate, this->_currentCallPortMate);
    datagram.appendData(arr);
    this->sendDatagram(datagram.getData());
}

void NetworkManager::sendAskChatPacket(QHostAddress ip, quint16 port)
{
    Datagram datagram(Datagram::PackageType::CHAT, Datagram::PackageOption::ASK);

    std::cout << "Send ask chat packet" << std::endl;
    datagram.setIpPort(ip, port);
    this->sendDatagram(datagram.getData());
}

void NetworkManager::setCurrentCallInfoMate(QHostAddress ip, quint16 port)
{
    this->_currentCallIpMate = ip;
    this->_currentCallPortMate = port;
}

void NetworkManager::sendAskSoundPacket(QHostAddress ip, quint16 port)
{
    Datagram datagram(Datagram::PackageType::SOUND, Datagram::PackageOption::ASK);

    std::cout << "Send ask sound packet" << std::endl;
    datagram.setIpPort(ip, port);
    this->setCurrentCallInfoMate(ip, port);
    this->sendDatagram(datagram.getData());
}

void NetworkManager::sendAcceptedChatPacket(QHostAddress ip, quint16 port)
{
    Datagram datagram(Datagram::PackageType::CHAT, Datagram::PackageOption::ACCEPTED);

    std::cout << "Send accepted chat packet" << std::endl;
    datagram.setIpPort(ip, port);
    this->sendDatagram(datagram.getData());
}

void NetworkManager::sendAcceptedSoundPacket(QHostAddress ip, quint16 port)
{
    Datagram datagram(Datagram::PackageType::SOUND, Datagram::PackageOption::ACCEPTED);

    std::cout << "Send accepted sound packet" << std::endl;
    this->_currentCallIpMate = ip;
    this->_currentCallPortMate = port;
    this->_audio->StartStreams();
    datagram.setIpPort(ip, port);

    this->sendDatagram(datagram.getData());
}

void NetworkManager::analysePacket()
{
    QNetworkDatagram packet;
    QByteArray arr;
    Datagram::PackageType type;
    Datagram::PackageOption option;

    packet = this->readDatagram();
    arr = packet.data();
    type = (Datagram::PackageType)arr.at(0);
    option = (Datagram::PackageOption)arr.at(1);
    arr.remove(0, 2);
    packet.setData(arr);
    std::cout << "type: " << type << " option: " << option << std::endl;
    (this->*_mapMethod[{type, option}])(packet);
}

void NetworkManager::getDataChatPacket(QNetworkDatagram data)
{
    std::cout << "[NETWORK MANAGER] getDataChatPacket" << std::endl;
    emit signalReceiveMessage(data.senderAddress(), data.senderPort(), (data.data()));
}

void NetworkManager::getAskChatPacket(QNetworkDatagram data)
{
    std::cout << "Receive ask chat packet" << std::endl;
    QHostAddress ipSender = data.senderAddress();
    int portSender = data.senderPort();
    emit signalGetAskChatPacket(ipSender, portSender);
}

void NetworkManager::getAcceptedChatPacket(QNetworkDatagram data)
{
    QHostAddress ipSender = data.senderAddress();
    int portSender = data.senderPort();
    emit signalGetAcceptedChatPacket(ipSender, portSender);
}

void NetworkManager::getRejectedChatPacket(QNetworkDatagram data)
{

}

void NetworkManager::getDataSoundPacket(QNetworkDatagram data)
{
    std::cout << "Receive data sound packet" << std::endl;
    this->_audio->setToPlay(data.data());
}

void NetworkManager::getAskSoundPacket(QNetworkDatagram data)
{
    std::cout << "Receive ask sound packet" << std::endl;
    QHostAddress ipSender = data.senderAddress();
    int portSender = data.senderPort();
    
    emit signalGetAskSoundPacket(ipSender, portSender);
}

void NetworkManager::getAcceptedSoundPacket(QNetworkDatagram data)
{
    QHostAddress ipSender = data.senderAddress();
    int portSender = data.senderPort();

    this->_currentCallIpMate = ipSender;
    this->_currentCallPortMate = portSender;
    this->_audio->StartStreams();
    emit signalGetAcceptedSoundPacket(ipSender, portSender);
}

void NetworkManager::getRejectedSoundPacket(QNetworkDatagram data)
{
    // emit signalGetRejectedSoundPacket();
}

void NetworkManager::getDataVideoPacket(QNetworkDatagram data)
{

}

void NetworkManager::getAskVideoPacket(QNetworkDatagram data)
{

}

void NetworkManager::getAcceptedVideoPacket(QNetworkDatagram data)
{

}

void NetworkManager::getRejectedVideoPacket(QNetworkDatagram data)
{

}