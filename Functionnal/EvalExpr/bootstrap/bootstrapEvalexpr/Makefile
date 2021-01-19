##
## EPITECH PROJECT, 2020
## FUN_imageCompressor_2019
## File description:
## Makefile
##

NAME	=	funEvalExpr

all:
		stack build --allow-different-user --copy-bins --local-bin-path .
		mv bootstrapEvalexpr-exe funEvalExpr

clean:
		stack clean --allow-different-user

fclean:	clean
		rm -f $(NAME)

tests_run:
		stack test

re:		clean all

.PHONY:	all clean fclean re tests_run