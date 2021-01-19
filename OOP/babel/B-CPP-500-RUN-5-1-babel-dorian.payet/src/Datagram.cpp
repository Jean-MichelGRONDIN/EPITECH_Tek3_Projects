/*
** EPITECH PROJECT, 2020
** Datagram
** File description:
** Datagram
*/

#include "Datagram.hpp"

Datagram::Datagram(PackageType type, PackageOption opt) : _type(type), _option(opt)
{
    setPackageOption(type, opt);
}
