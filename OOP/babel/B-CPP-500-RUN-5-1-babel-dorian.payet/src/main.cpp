/*
** EPITECH PROJECT, 2020
** main
** File description:
** main
*/

#include "Interface.h"
#include <QApplication>

int main(int ac, char **av)
{
    QApplication app(ac, av);
    // ClientCommunication com;
    // QNetworkDatagram datagram;
    // QByteArray arr("mon");

    // datagram.setData(arr);
    // com.sendDatagram(datagram);
    Interface interface;
    // MainWindow window;

    interface.show();
    // window.show();
    return (app.exec());
}