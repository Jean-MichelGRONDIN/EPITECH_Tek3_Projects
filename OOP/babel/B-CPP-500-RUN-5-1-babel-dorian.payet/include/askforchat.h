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
#include <QtWidgets/QTextEdit>

QT_BEGIN_NAMESPACE

class Ui_askforchat
{
public:
    QDialogButtonBox *buttonBox;
    QTextEdit *textEdit;

    void setupUi(QDialog *askforchat)
    {
        if (askforchat->objectName().isEmpty())
            askforchat->setObjectName(QString::fromUtf8("askforchat"));
        askforchat->resize(309, 247);
        buttonBox = new QDialogButtonBox(askforchat);
        buttonBox->setObjectName(QString::fromUtf8("buttonBox"));
        buttonBox->setGeometry(QRect(-110, 120, 341, 32));
        buttonBox->setOrientation(Qt::Horizontal);
        buttonBox->setStandardButtons(QDialogButtonBox::Cancel|QDialogButtonBox::Ok);
        textEdit = new QTextEdit(askforchat);
        textEdit->setObjectName(QString::fromUtf8("textEdit"));
        textEdit->setGeometry(QRect(50, 80, 191, 31));

        retranslateUi(askforchat);
        QObject::connect(buttonBox, SIGNAL(accepted()), askforchat, SLOT(accept()));
        QObject::connect(buttonBox, SIGNAL(rejected()), askforchat, SLOT(reject()));

        QMetaObject::connectSlotsByName(askforchat);
    } // setupUi

    void retranslateUi(QDialog *askforchat)
    {
        askforchat->setWindowTitle(QApplication::translate("askforchat", "Dialog", nullptr));
        textEdit->setHtml(QApplication::translate("askforchat", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Ubuntu'; font-size:11pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\"-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><br /></p></body></html>", nullptr));
    } // retranslateUi

};

namespace Ui {
    class askforchat: public Ui_askforchat {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_ASKFORCHAT_H
