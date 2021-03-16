{-# LANGUAGE CPP #-}
{-# LANGUAGE NoRebindableSyntax #-}
{-# OPTIONS_GHC -fno-warn-missing-import-lists #-}
module Paths_funEvalExpr (
    version,
    getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir,
    getDataFileName, getSysconfDir
  ) where

import qualified Control.Exception as Exception
import Data.Version (Version(..))
import System.Environment (getEnv)
import Prelude

#if defined(VERSION_base)

#if MIN_VERSION_base(4,0,0)
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#else
catchIO :: IO a -> (Exception.Exception -> IO a) -> IO a
#endif

#else
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#endif
catchIO = Exception.catch

version :: Version
version = Version [0,1,0,0] []
bindir, libdir, dynlibdir, datadir, libexecdir, sysconfdir :: FilePath

bindir     = "/home/jean-michel/stock/delivery/tek3/Functionnal/EvalExpr/B-FUN-500-RUN-5-1-funEvalExpr-jean-michel.grondin/.stack-work/install/x86_64-linux-tinfo6/2edccc6769444516b0bfa4089fa20abf47054cf5181df89cb0d1f5499af579b7/8.8.4/bin"
libdir     = "/home/jean-michel/stock/delivery/tek3/Functionnal/EvalExpr/B-FUN-500-RUN-5-1-funEvalExpr-jean-michel.grondin/.stack-work/install/x86_64-linux-tinfo6/2edccc6769444516b0bfa4089fa20abf47054cf5181df89cb0d1f5499af579b7/8.8.4/lib/x86_64-linux-ghc-8.8.4/funEvalExpr-0.1.0.0-HnMd0JycMtnCbWPvsYTp95-funEvalExpr-exe"
dynlibdir  = "/home/jean-michel/stock/delivery/tek3/Functionnal/EvalExpr/B-FUN-500-RUN-5-1-funEvalExpr-jean-michel.grondin/.stack-work/install/x86_64-linux-tinfo6/2edccc6769444516b0bfa4089fa20abf47054cf5181df89cb0d1f5499af579b7/8.8.4/lib/x86_64-linux-ghc-8.8.4"
datadir    = "/home/jean-michel/stock/delivery/tek3/Functionnal/EvalExpr/B-FUN-500-RUN-5-1-funEvalExpr-jean-michel.grondin/.stack-work/install/x86_64-linux-tinfo6/2edccc6769444516b0bfa4089fa20abf47054cf5181df89cb0d1f5499af579b7/8.8.4/share/x86_64-linux-ghc-8.8.4/funEvalExpr-0.1.0.0"
libexecdir = "/home/jean-michel/stock/delivery/tek3/Functionnal/EvalExpr/B-FUN-500-RUN-5-1-funEvalExpr-jean-michel.grondin/.stack-work/install/x86_64-linux-tinfo6/2edccc6769444516b0bfa4089fa20abf47054cf5181df89cb0d1f5499af579b7/8.8.4/libexec/x86_64-linux-ghc-8.8.4/funEvalExpr-0.1.0.0"
sysconfdir = "/home/jean-michel/stock/delivery/tek3/Functionnal/EvalExpr/B-FUN-500-RUN-5-1-funEvalExpr-jean-michel.grondin/.stack-work/install/x86_64-linux-tinfo6/2edccc6769444516b0bfa4089fa20abf47054cf5181df89cb0d1f5499af579b7/8.8.4/etc"

getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "funEvalExpr_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "funEvalExpr_libdir") (\_ -> return libdir)
getDynLibDir = catchIO (getEnv "funEvalExpr_dynlibdir") (\_ -> return dynlibdir)
getDataDir = catchIO (getEnv "funEvalExpr_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "funEvalExpr_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "funEvalExpr_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "/" ++ name)
