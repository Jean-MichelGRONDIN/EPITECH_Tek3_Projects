#ifndef SOUNDTAB_H
#define SOUNDTAB_H

#include <QWidget>
#include <QUdpSocket>
#include "NetworkManager.hpp"

namespace Ui {
class soundTab;
}

class soundTab : public QWidget
{
    Q_OBJECT

public:
    explicit soundTab(NetworkManager *network, QHostAddress ipMate, int portMate, QWidget *parent = nullptr);
    ~soundTab();

private:
    Ui::soundTab *ui;
    QString _nameUser;
    QString _nameDest;
    QHostAddress _ipMate;
    int _portMate;
    NetworkManager *_networksManager;
};

#endif // SOUNDTAB_H
