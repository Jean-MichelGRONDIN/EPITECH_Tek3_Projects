/*
** EPITECH PROJECT, 2020
** window
** File description:
** window
*/

#ifndef __windowww__
#define __windowww__

#include <QMainWindow>
#include <QWidget>
#include <QMenuBar>
#include <QTextEdit>
#include <QDialog>
#include <QGridLayout>
#include <QLineEdit>

class Window : public QMainWindow
{

    Q_OBJECT
    public:
        Window(QWidget *parent = nullptr);
        ~Window();

    private:
        QTextEdit *messageBox;
        QGridLayout *layout;
};

#endif /* !__windowww__ */
