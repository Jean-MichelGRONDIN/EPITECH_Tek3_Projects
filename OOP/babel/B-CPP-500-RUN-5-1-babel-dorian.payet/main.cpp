/*
** EPITECH PROJECT, 2020
** opus_test
** File description:
** main
*/


#include <iostream>

#include <unistd.h>

#include "PortAudio.hpp"

int main()
{
    try
    {
        IAudio *test = new PortAudio();

        test->CreateStreams();
        test->StartStreams();


        std::string cmd = "";
        while (cmd != "exit") {
            std::cin >> cmd;
        }


        test->StopStreams();
        test->DestroyStreams();
        delete test;
    }
    catch(const std::exception& e)
    {
        std::cout << e.what() << '\n';
    }
    return (0);
}
































































// // includes system
// #include <iostream>

// // includes de opus
// #include <opus/opus.h>

// int main(int ac, char **av)
// {
//     // Error management no file given as argument
//     if (ac != 2) {
//         std::cerr << "I need a file you boosted animal !" << std::endl;
//         return (84);
//     }


//     // Create and init encoder
//     int error_encoder = 0;
//     OpusEncoder* encoder = opus_encoder_create(48000, 1, OPUS_APPLICATION_VOIP, &error_encoder);
//     int ret_encoder_init = opus_encoder_init(encoder, 48000, 1, OPUS_APPLICATION_VOIP);
//     // Create and init decoder
//     int error_decoder = 0;
//     OpusDecoder* decoder = opus_decoder_create(48000, 1, &error_decoder);
//     int ret_decoder_init = opus_decoder_init(decoder, 48000, 1);

//     // Destroy encoder and decoder
//     opus_encoder_destroy(decoder);
//     opus_decoder_destroy(decoder);
//     return (0);
// }