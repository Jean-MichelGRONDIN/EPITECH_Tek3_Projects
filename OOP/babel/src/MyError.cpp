/*
** EPITECH PROJECT, 2020
** B-CPP-500-RUN-5-1-babel-dorian.payet
** File description:
** MyError
*/

#include "MyError.hpp"

MyError::MyError(std::string const &errorType, std::string const &message) : _message(message), _errorType(errorType)
{
}

const char *MyError::what() const noexcept
{
    return (this->_message.c_str());
}

const char *MyError::infos() const noexcept
{
    return (this->_errorType.c_str());
}