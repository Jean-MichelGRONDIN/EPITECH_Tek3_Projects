/********************************************************************************
** Form generated from reading UI file 'askforchat.ui'
**
** Created by: Qt User Interface Compiler version 5.12.8
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_ASKFORCHAT_H
#define UI_ASKFORCHAT_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QDialog>
#include <QtWidgets/QDialogButtonBox>

QT_BEGIN_NAMESPACE

class Ui_askforchat
{
public:
    QDialogButtonBox *buttonBox;

    void setupUi(QDialog *askforchat)
    {
        if (askforchat->objectName().isEmpty())
            askforchat->setObjectName(QString::fromUtf8("askforchat"));
        askforchat->resize(400, 300);
        buttonBox = new QDialogButtonBox(askforchat);
        buttonBox->setObjectName(QString::fromUtf8("buttonBox"));
        buttonBox->setGeometry(QRect(30, 240, 341, 32));
        buttonBox->setOrientation(Qt::Horizontal);
        buttonBox->setStandardButtons(QDialogButtonBox::Cancel|QDialogButtonBox::Ok);

        retranslateUi(askforchat);
        QObject::connect(buttonBox, SIGNAL(accepted()), askforchat, SLOT(accept()));
        QObject::connect(buttonBox, SIGNAL(rejected()), askforchat, SLOT(reject()));

        QMetaObject::connectSlotsByName(askforchat);
    } // setupUi

    void retranslateUi(QDialog *askforchat)
    {
        askforchat->setWindowTitle(QApplication::translate("askforchat", "Dialog", nullptr));
    } // retranslateUi

};

namespace Ui {
    class askforchat: public Ui_askforchat {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_ASKFORCHAT_H
