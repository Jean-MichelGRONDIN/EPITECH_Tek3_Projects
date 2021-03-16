#ifndef INTERFACE_H
#define INTERFACE_H

#include <QWidget>
#include <QVBoxLayout>
#include "NetworkManager.hpp"
#include "askfor.h"
#include "chattab.h"
#include "soundtab.h"
#include "ContactList.hpp"

namespace Ui {
class Interface;
}

class Interface : public QWidget
{
    Q_OBJECT

public:
    explicit Interface(QWidget *parent = nullptr);
    ~Interface();

public slots:
    void getAskChatPacket(QHostAddress ipSender, int port);
    void getAskSoundPacket(QHostAddress ipSender, int port);
    void sendAskChatPacket(bool checked);
    void sendAskSoundPacket(bool checked);
    void openChatTab(QHostAddress ipSender, int portSender);
    void openSoundTab(QHostAddress ipSender, int portSender);
    void receiveMessage(QHostAddress, int, QString);
    void getAcceptedChatPacket(QHostAddress ipSender, int port);
    void getAcceptedSoundPacket(QHostAddress ipSender, int portSender);
    void getRejectedSoundPacket();
    void setSelectedContactText(QListWidgetItem *);

private:
    NetworkManager *_networkManager;
    Ui::Interface *ui;
    askforchat *dialog_chat;
    askforsound *dialog_sound;
    ContactList *_contactList;
    std::map<quint32, chattab *> _tabsChat;
    std::map<quint32, soundTab *> _tabsSound;
    QVector<QString> _ipConnected;
};

#endif // INTERFACE_H
