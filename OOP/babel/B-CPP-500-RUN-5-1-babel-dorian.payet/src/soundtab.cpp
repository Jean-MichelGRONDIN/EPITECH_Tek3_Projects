#include "soundtab.h"
#include "ui_soundtab.h"

soundTab::soundTab(NetworkManager *network, QHostAddress ipMate, int portMate, QWidget *parent) :
    QWidget(parent),
    ui(new Ui::soundTab)
{
    ui->setupUi(this);
    _nameUser = "France";
    _nameDest = "Destinataire";
    _ipMate = ipMate;
    _portMate = portMate;
    this->_networksManager = network;
    // QObject::connect(this->ui->lineEdit, SIGNAL(returnPressed()), this, SLOT(sendChatDest()));
}

soundTab::~soundTab()
{
    delete ui;
}
