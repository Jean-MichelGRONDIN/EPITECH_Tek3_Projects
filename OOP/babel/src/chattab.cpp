#include "chattab.h"
#include "ui_chattab.h"
#include <QUdpSocket>
#include <iostream>



chattab::chattab(NetworkManager *network, QHostAddress ipMate, int portMate, QWidget *parent) :
    QWidget(parent),
    ui(new Ui::chattab)
{
    std::cout << "CREATE Chat Tab" << std::endl;
    ui->setupUi(this);
    _nameUser = "France";
    _nameDest = "Destinataire";
    _ipMate = ipMate;
    _portMate = portMate;
    this->_networksManager = network;
    QObject::connect(this->ui->lineEdit, SIGNAL(returnPressed()), this, SLOT(sendChatDest()));
    // QObject::connect(this->ui->pushButton, SIGNAL(clicked()), this, SLOT(sendAskSound()));
    // QObject::connect(this->_networksManager, SIGNAL(signalReceiveMessage(QString)), this, SLOT(receiveMessage(QString)));
    // QObject::connect(this->_networksManager->getClientCommunication()->getSocketUdp(), SIGNAL(readyRead()), this, SLOT(receivePacket()));
    // QObject::connect(this->_networksManager, SIGNAL(signalGetAskSoundPacket()), this, SLOT(receiveAskSoundPacket()));
    // QObject::connect(this->_networksManager, SIGNAL(signalGetAskChatPacket()), this, SLOT(receiveAskChatPacket()));
}

chattab::~chattab()
{
    delete ui;
}

std::string operator+(const std::string &str, const QString &message)
{
    std::string string(str);

    string.append(message.toStdString());
    return (string);
}

// void chattab::newMessage()
// {
//     *this << std::string("[") + this->_nameUser + std::string("] :") + this->ui->lineEdit->text();
//     emit sendMessage(this->ui->lineEdit->text());
// }

// void chattab::receivePacket()
// {
//     QNetworkDatagram data = _socket.readDatagram();

//     data.data()
//     *this << std::string("[") + this->_nameDest + std::string("] :") + this->ui->lineEdit->text();
// }

QString chattab::getStringMessage(const QString message)
{
    std::string mes = std::string("[") + this->_nameUser;

    return (tr(mes.c_str()));
}

// void chattab::setIpPort(QHostAddress *address = Q_NULLPTR, quint16 *port = Q_NULLPTR)
// {

// }

// void chattab::sendMessageDest(std::string mes)
// {
//     Datagram data;
//     QByteArray arr;

//     arr.append(mes.c_str());
//     data.appendData(arr);
//     this->_socket.sendDatagram(&data);
// }

void chattab::sendChatDest()
{
    *this << std::string("[") + this->_nameUser + std::string("] :") + this->ui->lineEdit->text().toStdString();
    std::cout << "SEND CHAT DEST" << std::endl;
    this->_networksManager->sendMessageToClient(_ipMate, _portMate, this->ui->lineEdit->text());
    // arr = arr.append(this->ui->lineEdit->text().toStdString().c_str());
    // datagram.appendData(arr);
    // datagram.setIpPort(this->_socket->ipDest, _socket->portDest);
    // this->_socket->sendDatagram(datagram.getData());
    this->ui->lineEdit->clear();
}

void chattab::sendAskSound()
{
    // this->_networksManager->sendAskSoundPacket();
}

void chattab::receiveMessage(QString str)
{
    *this << std::string("[") + this->_nameDest + std::string("] :") + str;
}

void chattab::receiveAskSoundPacket()
{

}

void chattab::receiveAskChatPacket()
{
}

void chattab::receivePacket()
{
    this->_networksManager->analysePacket();
}

chattab & chattab::operator<<(QString str)
{
    this->ui->textEdit->append(str);
    // this->ui->lineEdit->clear();
}

chattab & chattab::operator<<(std::string str)
{

    this->ui->textEdit->append(tr(str.c_str()));
    // this->ui->lineEdit->clear();
}

void chattab::addMessage(std::string mes, std::string nameWriter)
{
    std::string line;

    line.append("[");
    line.append(nameWriter);
    line.append("]: ");
    line.append(mes);
    this->ui->textEdit->append(tr(line.c_str()));
}

