/*
** EPITECH PROJECT, 2020
** Datagram
** File description:
** Datagram
*/

#ifndef __Datagram__
#define __Datagram__

#include <QNetworkDatagram>
#include <iostream>

class Datagram {
    public:
        enum PackageType {CHAT,SOUND,VIDEO};
        enum PackageOption {ASK,ACCEPTED,REJECTED,DATA};
        Datagram(PackageType type, PackageOption opt);
        void setPackageOption(Datagram::PackageType type, Datagram::PackageOption option) {
            QByteArray arr;

            std::cout << "[IN DATAGRAM] PARAMETERS: " << type << " " << option << std::endl;
            this->_type = type;
            this->_option = option;
            arr = arr.append(type);
            arr = arr.append(option);
            std::cout << "[IN DATAGRAM] ARR: " << arr.at(0) << " " << arr.at(1) << std::endl;
            _data.setData(arr);
            std::cout << "[IN DATAGRAM] length: " << _data.data().length() << " type: " << _data.data().at(0) << " opt: " << _data.data().at(1) << std::endl;
        };
        void setIpPort(QHostAddress address, quint16 port) {
            _data.setDestination(address, port);
        };
        void appendData(QByteArray &arr) {
            QByteArray data = _data.data();

            data = data.append(arr);
            this->_data.setData(data);
        };
        QNetworkDatagram &getData() {
            return (_data);
        };
        PackageType _type;
        PackageOption _option;
        QNetworkDatagram _data;
};

#endif /* !__Datagram__ */
