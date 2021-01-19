#include "askfor.h"
#include "ui_askforchat.h"
#include "NetworkManager.hpp"
#include <iostream>

askforchat::askforchat(QHostAddress ipSender, int portSender, NetworkManager *network, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::askforchat)
{
    ui->setupUi(this);
    QTextDocument *document = this->ui->textEdit->document();

    document->setPlainText(tr(" want to talk with you"));
    this->ui->textEdit->setAlignment(Qt::AlignCenter);
    this->_ip = ipSender;
    this->_portSender = portSender;
    this->network = network;
    QObject::connect(this->ui->buttonBox, SIGNAL(accepted()), this, SLOT(acceptedAsk()));
}

askforchat::~askforchat()
{
    std::cout << "[ASKFORCHAT] Je meurs" << std::endl;
    delete ui;
}

void askforchat::acceptedAsk()
{
    std::cout << "[ASKFORCHAT] You have accept the chat" << std::endl;
    this->network->sendAcceptedChatPacket(_ip, _portSender);
    emit signalAccepted(_ip, _portSender);
}

askforsound::askforsound(QHostAddress ipSender, int portSender, NetworkManager *network, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::askforchat)
{
    ui->setupUi(this);
    QTextDocument *document = this->ui->textEdit->document();

    document->setPlainText(tr(" is calling you"));
    this->ui->textEdit->setAlignment(Qt::AlignCenter);
    this->_ip = ipSender;
    this->_portSender = portSender;
    this->network = network;
    QObject::connect(this->ui->buttonBox, SIGNAL(accepted()), this, SLOT(acceptedAsk()));
}

askforsound::~askforsound()
{
    std::cout << "[ASKFORCHAT] Je meurs" << std::endl;
    delete ui;
}

void askforsound::acceptedAsk()
{
    std::cout << "[ASKFORSOUND] You have accept the call" << std::endl;
    this->network->sendAcceptedSoundPacket(_ip, _portSender);
    emit signalAccepted(_ip, _portSender);
}
