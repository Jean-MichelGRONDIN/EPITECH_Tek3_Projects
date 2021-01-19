/*
** EPITECH PROJECT, 2020
** contact
** File description:
** contact
*/

#ifndef __contactlist__
#define __contactlist__

#include <QObject>
#include <QVector>
#include <QListWidget>
#include <QListWidgetItem>
#include <iostream>

class ContactList : public QObject {
    public:
        ContactList(QListWidget *listWidget);
        // ~ContactList() = default;
        void addContact(std::string contact, int pos = -1);
        void delContact(QListWidgetItem *contact);
        void setPosition(int x, int y);
        QListWidgetItem *getContact(std::string name);

    private:
        QListWidget *_listWidget;
        QVector<QListWidgetItem *> _contactsConnected;
};

#endif /* !__contactlist__ */
