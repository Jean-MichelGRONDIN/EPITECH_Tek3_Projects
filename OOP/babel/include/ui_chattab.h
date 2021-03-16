/********************************************************************************
** Form generated from reading UI file 'chattab.ui'
**
** Created by: Qt User Interface Compiler version 5.12.8
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CHATTAB_H
#define UI_CHATTAB_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QTextEdit>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_chattab
{
public:
    QWidget *verticalLayoutWidget;
    QVBoxLayout *verticalLayout;
    QTextEdit *textEdit;
    QLineEdit *lineEdit;
    QPushButton *pushButton;

    void setupUi(QWidget *chattab)
    {
        if (chattab->objectName().isEmpty())
            chattab->setObjectName(QString::fromUtf8("chattab"));
        chattab->resize(522, 474);
        verticalLayoutWidget = new QWidget(chattab);
        verticalLayoutWidget->setObjectName(QString::fromUtf8("verticalLayoutWidget"));
        verticalLayoutWidget->setGeometry(QRect(10, 10, 501, 451));
        verticalLayout = new QVBoxLayout(verticalLayoutWidget);
        verticalLayout->setObjectName(QString::fromUtf8("verticalLayout"));
        verticalLayout->setContentsMargins(0, 0, 0, 0);
        textEdit = new QTextEdit(verticalLayoutWidget);
        textEdit->setObjectName(QString::fromUtf8("textEdit"));

        verticalLayout->addWidget(textEdit);

        lineEdit = new QLineEdit(verticalLayoutWidget);
        lineEdit->setObjectName(QString::fromUtf8("lineEdit"));

        verticalLayout->addWidget(lineEdit);

        pushButton = new QPushButton(verticalLayoutWidget);
        pushButton->setObjectName(QString::fromUtf8("pushButton"));

        verticalLayout->addWidget(pushButton);


        retranslateUi(chattab);

        QMetaObject::connectSlotsByName(chattab);
    } // setupUi

    void retranslateUi(QWidget *chattab)
    {
        chattab->setWindowTitle(QApplication::translate("chattab", "Form", nullptr));
        pushButton->setText(QApplication::translate("chattab", "Call", nullptr));
    } // retranslateUi

};

namespace Ui {
    class chattab: public Ui_chattab {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CHATTAB_H
