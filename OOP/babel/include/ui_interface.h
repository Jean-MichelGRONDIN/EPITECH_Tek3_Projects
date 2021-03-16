/********************************************************************************
** Form generated from reading UI file 'interface.ui'
**
** Created by: Qt User Interface Compiler version 5.12.8
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_INTERFACE_H
#define UI_INTERFACE_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QListWidget>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QTabWidget>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralwidget;
    QLineEdit *ipEdit;
    QLineEdit *portEdit;
    QPushButton *chatButton;
    QTabWidget *tabWidget;
    QListWidget *listContact;
    QLineEdit *contactSelected;
    QLabel *ipLabel;
    QLabel *portLabel;
    QPushButton *talkButton;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QString::fromUtf8("MainWindow"));
        MainWindow->resize(822, 607);
        centralwidget = new QWidget(MainWindow);
        centralwidget->setObjectName(QString::fromUtf8("centralwidget"));
        ipEdit = new QLineEdit(centralwidget);
        ipEdit->setObjectName(QString::fromUtf8("ipEdit"));
        ipEdit->setGeometry(QRect(650, 420, 150, 25));
        QFont font;
        font.setPointSize(12);
        ipEdit->setFont(font);
        ipEdit->setClearButtonEnabled(false);
        portEdit = new QLineEdit(centralwidget);
        portEdit->setObjectName(QString::fromUtf8("portEdit"));
        portEdit->setGeometry(QRect(650, 490, 150, 25));
        portEdit->setFont(font);
        chatButton = new QPushButton(centralwidget);
        chatButton->setObjectName(QString::fromUtf8("chatButton"));
        chatButton->setGeometry(QRect(650, 530, 70, 45));
        QFont font1;
        font1.setPointSize(13);
        chatButton->setFont(font1);
        tabWidget = new QTabWidget(centralwidget);
        tabWidget->setObjectName(QString::fromUtf8("tabWidget"));
        tabWidget->setEnabled(true);
        tabWidget->setGeometry(QRect(30, 20, 591, 561));
        tabWidget->setDocumentMode(false);
        listContact = new QListWidget(centralwidget);
        listContact->setObjectName(QString::fromUtf8("listContact"));
        listContact->setGeometry(QRect(650, 20, 150, 311));
        contactSelected = new QLineEdit(centralwidget);
        contactSelected->setObjectName(QString::fromUtf8("contactSelected"));
        contactSelected->setGeometry(QRect(650, 350, 150, 25));
        contactSelected->setReadOnly(true);
        ipLabel = new QLabel(centralwidget);
        ipLabel->setObjectName(QString::fromUtf8("ipLabel"));
        ipLabel->setGeometry(QRect(650, 390, 67, 17));
        ipLabel->setFont(font1);
        ipLabel->setLineWidth(1);
        portLabel = new QLabel(centralwidget);
        portLabel->setObjectName(QString::fromUtf8("portLabel"));
        portLabel->setGeometry(QRect(650, 460, 67, 17));
        portLabel->setFont(font1);
        talkButton = new QPushButton(centralwidget);
        talkButton->setObjectName(QString::fromUtf8("talkButton"));
        talkButton->setGeometry(QRect(730, 530, 70, 45));
        talkButton->setFont(font1);
        MainWindow->setCentralWidget(centralwidget);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "MainWindow", nullptr));
        ipEdit->setText(QString());
        chatButton->setText(QApplication::translate("MainWindow", "Chat", nullptr));
        ipLabel->setText(QApplication::translate("MainWindow", "IP", nullptr));
        portLabel->setText(QApplication::translate("MainWindow", "Port", nullptr));
        talkButton->setText(QApplication::translate("MainWindow", "Talk", nullptr));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_INTERFACE_H
