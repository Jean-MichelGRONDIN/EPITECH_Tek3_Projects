--
-- EPITECH PROJECT, 2020
-- B-FUN-500-RUN-5-1-funEvalExpr-jean-michel.grondin
-- File description:
-- evalExpr
--

module EvalExpr (
            evalExpr,
            evalExprLoopPowTwo,
            evalExprLoopPow,
            evalExprLoopMulDivThree,
            evalExprLoopMulDivTwo,
            evalExprLoopMulDiv,
            evalExprLoopAddSubThree,
            evalExprLoopAddSubTwo,
            evalExprLoopAddSub,
            evalExprLoopParenthese,
            evalExprLoopParentheseTwo,
            evalExprLoopParentheseCalc
            ) where

import Lib (
            safePowDouble,
            safeDivDouble,
            safeMulDouble,
            safeSubDouble,
            safeAddDouble,
            parseOperation,
            doubleToString,
            parseDouble,
            parseParentheses,
            parseAnyChar
            )

type Parser a = String -> Maybe (a, String)

-- evalExprLoopLessAdd :: Parser String

-- evalExprLoopMulDiv :: Parser String


evalExprLoopPowCalc :: Maybe ((Double, Double), String) -> Parser String
evalExprLoopPowCalc (Just((a,b),c)) _ = case res of
                                            Nothing -> Nothing
                                            Just (z) -> Just (z, c)
    where
        res = doubleToString (safePowDouble (Just a) (Just b))

evalExprLoopPowTwo :: Parser String
evalExprLoopPowTwo str
    | length str <= 2 = Just (str, [])
    | otherwise = case try of
                    Nothing -> Just (x:b, c)
                    _ -> case calc of
                            Nothing -> Just (x:b, c)
                            Just (e,f) -> Just (e++f, [])
    where
        (x:xs) = str
        try = parseOperation '^' str
        Just (b, c) = evalExprLoopPowTwo xs
        calc = evalExprLoopPowCalc try str

evalExprLoopPow :: Parser String
evalExprLoopPow str
    | a == str = Just ([], str)
    | otherwise = evalExprLoopPow a
    where
        Just (a,_) = evalExprLoopPowTwo str





evalExprLoopMulCalc :: Maybe ((Double, Double), String) -> Parser String
evalExprLoopMulCalc (Just((a,b),c)) _ = case res of
                                            Nothing -> Nothing
                                            Just (z) -> Just (z, c)
    where
        res = doubleToString (safeMulDouble (Just a) (Just b))

evalExprLoopDivCalc :: Maybe ((Double, Double), String) -> Parser String
evalExprLoopDivCalc (Just((a,b),c)) _ = case res of
                                            Nothing -> Nothing
                                            Just (z) -> Just (z, c)
    where
        res = doubleToString (safeDivDouble (Just a) (Just b))

evalExprLoopMulDivThree :: Parser String
evalExprLoopMulDivThree str
    | length str <= 2 = Just (str, [])
    | otherwise = case try of
                    Nothing -> Just (x:b, c)
                    _ -> case calc of
                            Nothing -> Just (x:b, c)
                            Just (e,f) -> Just (e++f, [])
    where
        (x:xs) = str
        try = parseOperation '/' str
        Just (b, c) = evalExprLoopMulDivTwo xs
        calc = evalExprLoopDivCalc try str

evalExprLoopMulDivTwo :: Parser String
evalExprLoopMulDivTwo str
    | length str <= 2 = Just (str, [])
    | otherwise = case try of
                    Nothing -> evalExprLoopMulDivThree str
                    _ -> case calc of
                            Nothing -> evalExprLoopMulDivThree str
                            Just (e,f) -> Just (e++f, [])
    where
        -- (x:xs) = str
        try = parseOperation '*' str
        -- Just (b, c) = evalExprLoopMulDivTwo xs
        calc = evalExprLoopMulCalc try str

evalExprLoopMulDiv :: Parser String
evalExprLoopMulDiv str
    | a == str = Just ([], str)
    | otherwise = evalExprLoopMulDiv a
    where
        Just (a,_) = evalExprLoopMulDivTwo str




evalExprLoopAddCalc :: Maybe ((Double, Double), String) -> Parser String
evalExprLoopAddCalc (Just((a,b),c)) _ = case res of
                                            Nothing -> Nothing
                                            Just (z) -> Just (z, c)
    where
        res = doubleToString (safeAddDouble (Just a) (Just b))

evalExprLoopSubCalc :: Maybe ((Double, Double), String) -> Parser String
evalExprLoopSubCalc (Just((a,b),c)) _ = case res of
                                            Nothing -> Nothing
                                            Just (z) -> Just (z, c)
    where
        res = doubleToString (safeSubDouble (Just a) (Just b))

evalExprLoopAddSubThree :: Parser String
evalExprLoopAddSubThree str
    | length str <= 2 = Just (str, [])
    | otherwise = case try of
                    Nothing -> Just (x:b, c)
                    _ -> case calc of
                            Nothing -> Just (x:b, c)
                            Just (e,f) -> Just (e++f, [])
    where
        (x:xs) = str
        try = parseOperation '-' str
        Just (b, c) = evalExprLoopAddSubTwo xs
        calc = evalExprLoopSubCalc try str

evalExprLoopAddSubTwo :: Parser String
evalExprLoopAddSubTwo str
    | length str <= 2 = Just (str, [])
    | otherwise = case try of
                    Nothing -> evalExprLoopAddSubThree str
                    _ -> case calc of
                            Nothing -> evalExprLoopAddSubThree str
                            Just (e,f) -> Just (e++f, [])
    where
        -- (x:xs) = str
        try = parseOperation '+' str
        -- Just (b, c) = evalExprLoopAddSubTwo xs
        calc = evalExprLoopAddCalc try str

evalExprLoopAddSub :: Parser String
evalExprLoopAddSub str
    | a == str = Just ([], str)
    | otherwise = evalExprLoopAddSub a
    where
        Just (a,_) = evalExprLoopAddSubTwo str





evalExprLoopParentheseCalc :: Maybe ([Char], String) -> Parser String
evalExprLoopParentheseCalc (Just(tab,c)) _ = case ret of
                                                Nothing -> Nothing
                                                Just (inside, _) -> Just (inside, c)
    where
        half = tail tab
        reversed = reverse half
        almost = tail reversed
        croped = reverse almost
        ret = evalExpr croped

evalExprLoopParentheseTwo :: Parser String
evalExprLoopParentheseTwo str
    | length str <= 2 = Just (str, [])
    | otherwise = case try of
                    Nothing -> Just (x:b, c)
                    _ -> case calc of
                            Nothing -> Just (x:b, c)
                            Just (e,f) -> Just (e++f, [])
    where
        (x:xs) = str
        try = parseParentheses (parseAnyChar ("+-*/^."++['0'..'9'])) str
        Just (b, c) = evalExprLoopParentheseTwo xs
        calc = evalExprLoopParentheseCalc try str

evalExprLoopParenthese :: Parser String
evalExprLoopParenthese str
    | a == str = Just ([], str)
    | otherwise = evalExprLoopParenthese a
    where
        Just (a,_) = evalExprLoopParentheseTwo str




evalExprLoop :: Parser String
evalExprLoop str = case finalCheck of
                        Nothing -> Nothing
                        Just (_,h) -> case h of
                                        [] -> Just (f, [])
                                        _ -> Nothing
    where
        Just (_,z) = evalExprLoopParenthese str
        Just (_,b) = evalExprLoopPow z
        Just (_,d) = evalExprLoopMulDiv b
        Just (_,f) = evalExprLoopAddSub d
        finalCheck = parseDouble f


evalExpr :: Parser String
evalExpr [] = Nothing
evalExpr str = evalExprLoop str

