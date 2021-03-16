/*
** EPITECH PROJECT, 2020
** CONTAACT
** File description:
** CONTACT
*/

#include "ContactList.hpp"

ContactList::ContactList(QListWidget *listWidget)
{
    this->_listWidget = listWidget;
    this->addContact(std::string("France"));
}

void ContactList::addContact(std::string contact, int pos)
{
    QListWidgetItem *item = new QListWidgetItem(contact.c_str());
    QList<QListWidgetItem *> tmp = _listWidget->findItems(tr(contact.c_str()), Qt::MatchExactly);

    if (getContact(contact) != nullptr)
        return;
    if (pos != -1)
        this->_listWidget->insertItem(pos, item);
    else
        this->_listWidget->addItem(item);
}

void ContactList::delContact(QListWidgetItem *contact)
{
    this->_listWidget->removeItemWidget(contact);
}

void ContactList::setPosition(int x, int y)
{
    this->_listWidget->move(x, y);
}

QListWidgetItem *ContactList::getContact(std::string name)
{
    QList<QListWidgetItem *> contact = _listWidget->findItems(tr(name.c_str()), Qt::MatchExactly);
    int size = contact.size();

    if (size <= 0)
        return (nullptr);
    if (size > 1)
        return (nullptr);
    return (contact[0]);
}