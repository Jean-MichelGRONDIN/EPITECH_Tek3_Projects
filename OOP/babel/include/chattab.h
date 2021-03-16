#ifndef CHATTAB_H
#define CHATTAB_H

#include <QWidget>
#include <QUdpSocket>
#include "NetworkManager.hpp"

namespace Ui {
class chattab;
}

class chattab : public QWidget
{
    Q_OBJECT

public:
    explicit chattab(NetworkManager *network, QHostAddress ipMate, int portMate, QWidget *parent = nullptr);
    chattab &operator<<(const QString str);
    chattab &operator<<(std::string str);
    NetworkManager *_networksManager;
    void addMessage(std::string mes, std::string nameWriter);

    ~chattab();

signals:
    void sendMessage(QString str);
    void signalReceiveMessage(QString);

private:
    QString getStringMessage(QString message);
    // void setIpPort(QHostAddress *address = Q_NULLPTR, quint16 *port = Q_NULLPTR);
    Ui::chattab *ui;
    QString _nameUser;
    QString _nameDest;
    QHostAddress _ipMate;
    int _portMate;

public slots:
    // When receive packet from client
    // void newPacket();

    // void newMessage();
    // When i send chat packet
    void sendChatDest();
    void sendAskSound();
    // when receive chat packet
    void receivePacket();
    void receiveMessage(QString str);
    void receiveAskSoundPacket();
    void receiveAskChatPacket();
    // when receive sound packet
    // void receiveSound();
};

#endif // CHATTAB_H
