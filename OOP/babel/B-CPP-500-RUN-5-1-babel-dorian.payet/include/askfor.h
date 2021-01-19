#ifndef ASKFORCHAT_H
#define ASKFORCHAT_H

#include <QDialog>
#include <QHostAddress>
#include "NetworkManager.hpp"

namespace Ui {
class askforchat;
}

class askforchat : public QDialog
{
    Q_OBJECT

public:
    explicit askforchat(QHostAddress ipSender, int portSender, NetworkManager *network, QWidget *parent = nullptr);
    ~askforchat();
    QHostAddress _ip;
    int _portSender;
    NetworkManager *network;


signals:
    void signalAccepted(QHostAddress, int);

public slots:
    void acceptedAsk();

private:
    Ui::askforchat *ui;
};

class askforsound : public QDialog
{
    Q_OBJECT

public:
    explicit askforsound(QHostAddress ipSender, int portSender, NetworkManager *network, QWidget *parent = nullptr);
    ~askforsound();
    QHostAddress _ip;
    int _portSender;
    NetworkManager *network;


signals:
    void signalAccepted(QHostAddress, int);

public slots:
    void acceptedAsk();

private:
    Ui::askforchat *ui;
};

#endif // ASKFORCHAT_H
