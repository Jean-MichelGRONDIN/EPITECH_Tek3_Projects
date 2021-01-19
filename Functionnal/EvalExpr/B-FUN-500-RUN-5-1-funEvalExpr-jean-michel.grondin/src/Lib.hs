--
-- EPITECH PROJECT, 2020
-- B-FUN-500-RUN-5-1-funEvalExpr-jean-michel.grondin
-- File description:
-- Lib
--

module Lib
    (
    parseChar,
    parseAnyChar,
    parseOr,
    parseAnd,
    parseAndWith,
    parseMany,
    parseSome,
    parseUInt,
    removeAllCharOcur,
    parseInt,
    parseTuple,
    parseParentheses,
    countNbThisChar,
    checkNbParentheses,
    parseOperation,
    parseDouble,
    exitError,
    exitSucess,
    doubleToString,
    safeAddDouble,
    safeSubDouble,
    safeMulDouble,
    safeDivDouble,
    safePowDouble,
    safeStringCat,
    Parser
    ) where

import System.Exit ( ExitCode(ExitFailure), ExitCode(ExitSuccess), exitWith )

exitError :: String -> IO ()
exitError str = putStrLn str >>
                exitWith (ExitFailure 84)

exitSucess :: String -> IO ()
exitSucess str = putStrLn str >>
                 exitWith (ExitSuccess)

type Parser a = String -> Maybe (a, String)

parseChar :: Char -> Parser Char
parseChar _ [] = Nothing
parseChar c (x:xs)
    | c == x = Just (x, xs)
    | otherwise = Nothing

parseAnyChar :: String -> Parser Char
parseAnyChar [] _ = Nothing
parseAnyChar (x:xs) str = case c of
                            Nothing -> parseAnyChar xs str
                            _ -> c
    where c = parseChar x str

parseOr :: Parser a -> Parser a -> Parser a
parseOr fOne fTwo arg = case resone of
                            Nothing -> fTwo arg
                            _ -> resone
    where resone = fOne arg

parseAnd :: Parser a -> Parser b -> Parser (a, b)
parseAnd fOne fTwo arg = case resOne of
                            Nothing -> Nothing
                            Just (x1,_) -> case secondRes of
                                                Nothing -> Nothing
                                                Just (y1,y2) -> Just ((x1, y1), y2)
    where
        resOne = fOne arg
        Just (_,d) = resOne
        secondRes = fTwo d

parseAndWith :: (a -> b -> c) -> Parser a -> Parser b -> Parser c
parseAndWith fFormat fOne fTwo arg = case res of
                                    Nothing -> Nothing
                                    Just ((x,y), rest) -> Just (fFormat x y, rest)
    where
        res = parseAnd fOne fTwo arg

parseMany :: Parser a -> Parser [a]
parseMany _ [] = Just ([], [])
parseMany fOne (x:xs) = case thisOne of
                        Nothing -> Just ([], x:xs)
                        _ -> Just (a:c, d)
    where
        thisOne = fOne (x:xs)
        Just (a,b) = thisOne
        Just (c,d) = parseMany fOne b

parseSome :: Parser a -> Parser [a]
parseSome fOne str
    | length a == 0 = Nothing
    | otherwise = Just (a, b)
    where
        Just (a, b) = parseMany fOne str

parseUInt :: Parser Int
parseUInt str
    | res == Nothing = Nothing
    | otherwise = Just ((read b :: Int), c)
    where
        res = parseAnd (parseMany (parseAnyChar ['+'])) (parseSome (parseAnyChar ['0'..'9'])) str
        Just ((_, b), c) = res

removeAllCharOcur :: Char -> [Char] -> [Char]
removeAllCharOcur _ [] = []
removeAllCharOcur r (x:xs)
    | x == r = removeAllCharOcur r xs
    | otherwise = x:(removeAllCharOcur r xs)

parseInt :: Parser Int
parseInt str
    | res == Nothing = Nothing
    | nbLess == 0 = Just ((read b :: Int), c)
    | otherwise = Just (((read b :: Int) * (-1)), c)
    where
        res = parseAnd (parseMany (parseAnyChar ['+','-'])) (parseSome (parseAnyChar ['0'..'9'])) str
        Just ((a, b), c) = res
        nbLess = (length (removeAllCharOcur '+' a)) `mod` 2

parseTuple :: Parser a -> Parser (a,a)
parseTuple func str = case four of
                      Nothing -> Nothing
                      Just ((((_, a), (_, b)), _), c) -> Just ((a,b), c)
    where
        one = parseAnd (parseChar '(') (func)
        two = parseAnd (parseChar ',') (func)
        three = parseAnd one two
        four = parseAnd three (parseChar ')') str

countNbThisChar :: String -> Char -> Int
countNbThisChar [] _ = 0
countNbThisChar (x:xs) c
    | x == c = 1 + (countNbThisChar xs c)
    | otherwise = countNbThisChar xs c

checkNbParentheses :: String -> Int -> Bool
checkNbParentheses _ 0 = True
checkNbParentheses [] _ = False
checkNbParentheses ('(':xs) n = checkNbParentheses xs (n + 1)
checkNbParentheses (')':xs) n = checkNbParentheses xs (n - 1)
checkNbParentheses (_:xs) n = checkNbParentheses xs n

parseParenthesesThree :: Parser Char -> Parser [Char]
parseParenthesesThree func str = case res of
                                    Nothing -> Nothing
                                    Just (a,b) -> case (parseParenthesesTwo func b) of
                                                        Nothing -> Nothing
                                                        Just (c,d) -> Just (a ++ c, d)
    where
        res = (parseParentheses func str)

parseParenthesesTwo :: Parser Char -> Parser [Char]
parseParenthesesTwo _ [] = Nothing
parseParenthesesTwo func (x:xs) = case res of
                                    (_, ')', _) -> Just ([')'], xs)
                                    (_, '(', _) -> parseParenthesesThree func (x:xs)
                                    (Nothing, _, _) -> Nothing
                                    (_, _, Nothing) -> Nothing
                                    (_, c, Just (a,b)) -> Just (c:a, b)
    where
        res = (func (x:[]), x, parseParenthesesTwo func xs)

parseParentheses :: Parser Char -> Parser [Char]
parseParentheses _ [] = Nothing
parseParentheses func (x:xs) = case check of
                                    (Nothing, _) -> Nothing
                                    (_, False) -> Nothing
                                    _ -> case checktwo of
                                            Nothing -> Nothing
                                            Just (a, b) -> Just('(':a, b)
    where
        check = (parseChar '(' ([x]), (checkNbParentheses xs 1))
        checktwo = parseParenthesesTwo func xs

readAnyNbDouble :: String -> Double
readAnyNbDouble str
    | countNbThisChar str '.' == 0 = read (str ++ ".0") :: Double
    | otherwise = read str :: Double

parseDoubleThree :: Parser Double
parseDoubleThree str
    | res == Nothing = Nothing
    | nbLess == 0 = Just ((readAnyNbDouble (b)), c)
    | otherwise = Just (((readAnyNbDouble (b)) * (-1.0)), c)
    where
        res = parseAnd (parseMany (parseAnyChar ['+','-'])) (parseSome (parseAnyChar ['0'..'9'])) str
        Just ((a,b),c) = res
        nbLess = (length (removeAllCharOcur '+' a)) `mod` 2

parseDoubleTwo :: Parser Double
parseDoubleTwo str
    | three == Nothing = parseDoubleThree str
    | nbLess == 0 = Just ((readAnyNbDouble w), z)
    | otherwise = Just (((readAnyNbDouble w) * (-1.0)), z)
    where
        res = parseAnd (parseMany (parseAnyChar ['+','-'])) (parseSome (parseAnyChar ['0'..'9']))
        three = parseAnd res (parseMany (parseChar '.')) str
        Just (((v,w), _), z) = three
        nbLess = (length (removeAllCharOcur '+' v)) `mod` 2

parseDouble :: Parser Double
parseDouble str
    | three == Nothing = parseDoubleTwo str
    | nbLess == 0 = Just ((readAnyNbDouble (w ++ ['.'] ++ y)), z)
    | otherwise = Just (((readAnyNbDouble (w ++ ['.'] ++ y)) * (-1.0)), z)
    where
        res = parseAnd (parseMany (parseAnyChar ['+','-'])) (parseSome (parseAnyChar ['0'..'9']))
        two = parseAnd (parseMany (parseChar '.')) (parseSome (parseAnyChar ['0'..'9']))
        three = parseAnd res two str
        Just (((v,w), (_,y)), z) = three
        nbLess = (length (removeAllCharOcur '+' v)) `mod` 2

doubleToString :: Maybe (Double) -> Maybe (String)
doubleToString var = case var of
                        Nothing -> Nothing
                        _ -> Just (str)
    where
        Just (a) = var
        str = show a

parseOperation :: Char -> Parser (Double,Double)
parseOperation _ []   = Nothing
parseOperation op str = case res of
                            Nothing -> Nothing
                            Just (((a,_),c),d) -> Just ((a,c),d)
    where
        one = parseAnd parseDouble (parseChar op)
        res = parseAnd one parseDouble str

safeAddDouble :: Maybe (Double) -> Maybe (Double) -> Maybe(Double)
safeAddDouble one two = case both of
                        (Nothing, _) -> Nothing
                        (_, Nothing) -> Nothing
                        (Just(x), Just(y)) -> Just (x + y)
    where
        both = (one,two)

safeSubDouble :: Maybe (Double) -> Maybe (Double) -> Maybe(Double)
safeSubDouble one two = case both of
                        (Nothing, _) -> Nothing
                        (_, Nothing) -> Nothing
                        (Just(x), Just(y)) -> Just (x - y)
    where
        both = (one,two)

safeMulDouble :: Maybe (Double) -> Maybe (Double) -> Maybe(Double)
safeMulDouble one two = case both of
                        (Nothing, _) -> Nothing
                        (_, Nothing) -> Nothing
                        (Just(x), Just(y)) -> Just (x * y)
    where
        both = (one,two)

safeDivDouble :: Maybe (Double) -> Maybe (Double) -> Maybe(Double)
safeDivDouble one two = case both of
                        (Nothing, _) -> Nothing
                        (_, Nothing) -> Nothing
                        (_, Just(0)) -> Nothing
                        (Just(x), Just(y)) -> Just (x / y)
    where
        both = (one,two)

safePowDouble :: Maybe (Double) -> Maybe (Double) -> Maybe(Double)
safePowDouble one two = case both of
                        (Nothing, _) -> Nothing
                        (_, Nothing) -> Nothing
                        (Just(x), Just(y)) -> Just (x ** y)
    where
        both = (one,two)

safeStringCat :: Maybe (String) -> Maybe (String) -> Maybe (String)
safeStringCat one two = case both of
                            (Nothing,Nothing) -> Nothing
                            (Nothing,Just(a)) -> Just (a)
                            (Just (b),Nothing) -> Just (b)
                            (Just (c),Just (d)) -> Just (c ++ d)
    where
        both = (one,two)



