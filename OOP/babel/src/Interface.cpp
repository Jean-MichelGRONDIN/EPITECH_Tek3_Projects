#include "Interface.h"
#include "ui_interface.h"
#include "askfor.h"
#include "soundtab.h"
#include "ContactList.hpp"

Interface::Interface(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::Interface)
{
    ui->setupUi(this);
    this->_networkManager = new NetworkManager();
    this->_contactList = new ContactList(this->ui->listContact);
    QObject::connect(this->_networkManager, SIGNAL(signalGetAskChatPacket(QHostAddress, int)), this, SLOT(getAskChatPacket(QHostAddress, int)));
    QObject::connect(this->_networkManager, SIGNAL(signalGetAskSoundPacket(QHostAddress, int)), this, SLOT(getAskSoundPacket(QHostAddress, int)));
    QObject::connect(this->_networkManager, SIGNAL(signalReceiveMessage(QHostAddress, int, QString)), this, SLOT(receiveMessage(QHostAddress, int, QString)));
    QObject::connect(this->_networkManager, SIGNAL(signalGetAcceptedChatPacket(QHostAddress, int)), this, SLOT(getAcceptedChatPacket(QHostAddress, int)));
    QObject::connect(this->_networkManager, SIGNAL(signalGetAcceptedSoundPacket(QHostAddress, int)), this, SLOT(getAcceptedSoundPacket(QHostAddress, int)));

    QObject::connect(ui->chatButton, SIGNAL(clicked(bool)), this, SLOT(sendAskChatPacket(bool)));
    QObject::connect(ui->talkButton, SIGNAL(clicked(bool)), this, SLOT(sendAskSoundPacket(bool)));
    QObject::connect(ui->listContact, SIGNAL(itemClicked(QListWidgetItem *)), this, SLOT(setSelectedContactText(QListWidgetItem *)));
}

Interface::~Interface()
{
    delete ui;
}

void Interface::setSelectedContactText(QListWidgetItem *item)
{
    QString itemString = item->text();


    this->ui->contactSelected->setText(itemString);
}

void Interface::receiveMessage(QHostAddress ipSender, int portSender, QString mes)
{
    chattab *tabMessage;

    // std::cout << "I received a message" << std::endl;
    if (this->_tabsChat.count(ipSender.toIPv4Address()) <= 0) {
        // std::cout << "We will create a new WINDOW" << std::endl;
        tabMessage = new chattab(this->_networkManager, ipSender, portSender,this->ui->tabWidget);
        this->_tabsChat.insert({ipSender.toIPv4Address(), tabMessage});
        this->ui->tabWidget->addTab(tabMessage, tr(std::string("Talk with ").append(std::to_string(ipSender.toIPv4Address())).c_str()));
    } else {
        // std::cout << "Window is already here" << std::endl;
        tabMessage = this->_tabsChat.at(ipSender.toIPv4Address());
    }
    tabMessage->addMessage(mes.toStdString(), std::to_string(ipSender.toIPv4Address()));
}

void Interface::openSoundTab(QHostAddress ipSender, int portSender)
{
    QFrame *frame = new QFrame(this);
    QVBoxLayout *layout = new QVBoxLayout(frame);
    soundTab *tabSound;

    frame->setFixedHeight(this->ui->tabWidget->height());
    frame->setFixedWidth(this->ui->tabWidget->width());
    tabSound = new soundTab(this->_networkManager, ipSender, portSender, this->ui->tabWidget);
    this->_tabsSound.insert({ipSender.toIPv4Address(), tabSound});
    layout->addWidget(tabSound);
    frame->setLayout(layout);
    // this->_networkManager->setCurrentCallInfoMate(ipSender, portSender);
    this->ui->tabWidget->addTab(frame, tr(std::string("Talk with ").append(std::to_string(ipSender.toIPv4Address())).c_str()));
    // this->_audio->OpenRecordStream();
}

void Interface::openChatTab(QHostAddress ipSender, int portSender)
{
    QFrame *frame = new QFrame(this);
    QVBoxLayout *layout = new QVBoxLayout(frame);
    chattab *tabMessage;

    // frame->setMinimumWidth(this->ui->tabWidget->width());
    // frame->setMinimumHeight(this->ui->tabWidget->height());
    // frame->setMaximumWidth(this->ui->tabWidget->width());
    // frame->setMaximumWidth(this->ui->tabWidget;
    // std::cout << "WIDTH: " << this->ui->tabWidget->width() << " HEIGHT: " << this->ui->tabWidget->height() << std::endl;
    // frame->setFixedSize(this->ui->tabWidget->width(), this->ui->tabWidget->height());
    frame->setFixedHeight(this->ui->tabWidget->height());
    frame->setFixedWidth(this->ui->tabWidget->width());
    // frame->setMaximumHeight(this->ui->tabWidget->height());
    tabMessage = new chattab(this->_networkManager, ipSender, portSender, this->ui->tabWidget);
    this->_tabsChat.insert({ipSender.toIPv4Address(), tabMessage});
    layout->addWidget(tabMessage);
    frame->setLayout(layout);
    // QObject::connect(this->_networkManager, SIGNAL(signalReceiveMessage(QHostAddress, int, QString)), this, SLOT(receiveMessage(QHostAddress, int, QString)));
    // QObject::connect(this->_networkManager, SIGNAL(signalSendMessage(QHostAddress, int, QString str)), this, SLOT())
    this->ui->tabWidget->addTab(frame, tr(std::string("Chat with ").append(std::to_string(ipSender.toIPv4Address())).c_str()));
}

void Interface::getAcceptedChatPacket(QHostAddress ipSender, int portSender)
{
    chattab *tabMessage;

    if (this->_tabsChat.count(ipSender.toIPv4Address()) <= 0) {
        std::cout << "We will create a new WINDOW" << std::endl;
        tabMessage = new chattab(this->_networkManager, ipSender, portSender,this->ui->tabWidget);
        this->_tabsChat.insert({ipSender.toIPv4Address(), tabMessage});
        this->ui->tabWidget->addTab(tabMessage, tr(std::string("Chat with ").append(std::to_string(ipSender.toIPv4Address())).c_str()));
    }
}

void Interface::getAcceptedSoundPacket(QHostAddress ipSender, int portSender)
{
    soundTab *tabSound;

    if (this->_tabsSound.count(ipSender.toIPv4Address()) <= 0) {
        this->ui->talkButton->setEnabled(false);
        std::cout << "We will create a new Tab Sound" << std::endl;
        tabSound = new soundTab(this->_networkManager, ipSender, portSender,this->ui->tabWidget);
        this->_tabsSound.insert({ipSender.toIPv4Address(), tabSound});
        this->ui->tabWidget->addTab(tabSound, tr(std::string("Talk with ").append(std::to_string(ipSender.toIPv4Address())).c_str()));
    }
}

void Interface::getRejectedSoundPacket()
{
    this->ui->talkButton->setEnabled(true);
}

void Interface::getAskChatPacket(QHostAddress ipSender, int port)
{
    std::cout << "Bien entré dans ask chat packet" << std::endl;
    if (this->_tabsChat.count(ipSender.toIPv4Address()) <= 0) {
        dialog_chat = new askforchat(ipSender, port, this->_networkManager, this);
        dialog_chat->show();
        QObject::connect(dialog_chat, SIGNAL(signalAccepted(QHostAddress, int)), this, SLOT(openChatTab(QHostAddress, int)));
    }
}

void Interface::getAskSoundPacket(QHostAddress ipSender, int port)
{
    std::cout << "Bien entré dans ask sound packet" << std::endl;
    if (this->_tabsSound.count(ipSender.toIPv4Address()) <= 0) {
        dialog_sound = new askforsound(ipSender, port, this->_networkManager, this);
        dialog_sound->show();
        QObject::connect(dialog_sound, SIGNAL(signalAccepted(QHostAddress, int)), this, SLOT(openSoundTab(QHostAddress, int)));
    }
}

void Interface::sendAskChatPacket(bool checked)
{
    // dialog = new askforchat(this);
    std::string _nameYouWantCall = this->ui->contactSelected->text().toStdString();
    QHostAddress ipDest(this->_networkManager->getIpName(_nameYouWantCall));
    // quint16 portDest(this->ui->portEdit->text().toInt());
    quint16 portDest(45457);
    this->_networkManager->sendAskChatPacket(ipDest, portDest);
}

void Interface::sendAskSoundPacket(bool checked)
{
    std::string _nameYouWantCall = this->ui->contactSelected->text().toStdString();
    QHostAddress ipDest(this->_networkManager->getIpName(_nameYouWantCall));
    quint16 portDest(45457);

    this->ui->talkButton->setEnabled(false);
    this->_networkManager->sendAskSoundPacket(ipDest, portDest);
}