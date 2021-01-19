--
-- EPITECH PROJECT, 2020
-- B-FUN-500-RUN-5-1-funEvalExpr-jean-michel.grondin
-- File description:
-- Main
--

module Main where

import Lib (
            exitError,
            exitSucess,
            removeAllCharOcur,
            parseDouble
            )

import EvalExpr ( evalExpr )

import System.Environment ( getArgs )

import Text.Printf ( printf )

myNth :: [a] -> Int -> a
myNth [] _ = error "nth empty tab encountered"
myNth a 0 = head a
myNth a i
    | i < 0 = myNth a (length a + i)
    | i > ((length a) - 1) = myNth a (abs (length a - i))
    | otherwise = myNth (tail(a)) (i - 1)


customPrint :: String -> IO ()
customPrint str = printf "%.2f" res
    where
        Just (a,_) = ((parseDouble str))
        tmp = fromInteger (round (a * 100.0) :: Integer)
        res = (tmp / 100) :: Double


main :: IO ()
main = do args <- getArgs
          case (evalExpr (removeAllCharOcur ' ' (myNth args 0))) of
                Nothing -> exitError "Bad expression given as parameter"
                Just (a,_) -> customPrint a >>
                              exitSucess ""


