/*
** EPITECH PROJECT, 2020
** B-CPP-500-RUN-5-1-babel-dorian.payet
** File description:
** MyError
*/

#ifndef MYERROR_HPP_
#define MYERROR_HPP_

#include <string>

// ErrorTypes
#define ALLOCATION_ERROR "Allocation Error"
#define VALUE_NOT_INITIALIZED "Value Not Initialized"
// #define UNDEFINED "Undefined Error"
#define NO_DEFAULT_DEVICE "No Default Device"
#define ERROR_STREAM "Error Stream"
#define ERROR_FILE "Error File"


class MyError : public std::exception
{
    public:
        MyError(std::string const &errorType = "Undefined Error Type", std::string const &message = "No Error Message.");
        const char *what() const noexcept;
        const char *infos() const noexcept;

    private:
        std::string _errorType;
        std::string _message;
};
#endif /* !MYERROR_HPP_ */
