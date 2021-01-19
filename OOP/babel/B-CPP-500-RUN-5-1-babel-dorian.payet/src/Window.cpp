/*
** EPITECH PROJECT, 2020
** window
** File description:
** window
*/

#include "Window.hpp"

Window::Window(QWidget *parent) : QMainWindow(parent)
{
    this->resize(1000, 1000);
    menuBar()->addMenu(tr("&File"));
    this->messageBox = new QTextEdit(this);
    messageBox->setReadOnly(true);
    layout = new QGridLayout(this->messageBox);
    layout->addWidget(new QTextEdit, 0, 0, 1, 1);
    layout->addWidget(new QTextEdit, 2, 0, 2, 2);
    layout->addWidget(new QTextEdit, 4, 0, 2, 2);
    layout->addWidget(new QTextEdit, 0, 2, 1, 1);
    layout->addWidget(new QTextEdit, 2, 2, 1, 1);
    layout->addWidget(new QTextEdit, 4, 2, 1, 1);
    layout->addWidget(new QTextEdit, 0, 4, 1, 1);
    layout->addWidget(new QTextEdit, 2, 4, 1, 1);
    layout->addWidget(new QTextEdit, 4, 4, 1, 1);
    setCentralWidget(messageBox);
}

Window::~Window()
{
}

