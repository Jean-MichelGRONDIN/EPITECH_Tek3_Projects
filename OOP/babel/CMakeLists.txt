project(babel_client)
cmake_minimum_required(VERSION 2.8.12)
add_definitions("-fPIC")

message(STATUS "yo: ${CMAKE_BINARY_DIR}")
include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)

conan_basic_setup()

find_package(Qt5Widgets CONFIG REQUIRED)
find_package(Qt5 COMPONENTS Network REQUIRED)

set(CMAKE_INCLUDE_PATH ${PROJECT_SOURCE_DIR}/include)

include_directories(${CMAKE_INCLUDE_PATH})

SET(CMAKE_AUTOMOC ON)
SET(CMAKE_AUTOUIC ON)
SET(CMAKE_AUTORCC ON)

FILE(GLOB SRCS src/*.cpp)
FILE(GLOB HDRS include/*)

include_directories(${CMAKE_INCLUDE_PATH} ${OPUS_INCLUDEDIR})
add_executable(babel_client ${SRCS} ${HDRS})
target_link_libraries(babel_client ${CONAN_LIBS} Qt5::Widgets Qt5::Network ${OPUS_LIBRARY})
