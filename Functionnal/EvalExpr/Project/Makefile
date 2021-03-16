##
## EPITECH PROJECT, 2020
## B-FUN-500-RUN-5-1-funEvalExpr-jean-michel.grondin
## File description:
## Makefile
##


NAME	=	funEvalExpr

all:
		stack build --allow-different-user --copy-bins --local-bin-path .
		mv funEvalExpr-exe funEvalExpr

clean:
		stack clean --allow-different-user

fclean:	clean
		rm -f $(NAME)

tests_run:
		stack test

re:		clean all

.PHONY:	all clean fclean re tests_run