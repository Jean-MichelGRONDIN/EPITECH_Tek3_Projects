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
    parseTuple
    ) where

someFunc :: IO ()
someFunc = putStrLn "someFunc"

type Parser a = String -> Maybe (a, String)

parseChar :: Char -> Parser Char
parseChar c (x:xs)
    | c == x = Just (x, xs)
    | otherwise = Nothing

parseAnyChar :: String -> Parser Char
parseAnyChar [] str = Nothing
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
parseMany fOne [] = Just ([], [])
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

