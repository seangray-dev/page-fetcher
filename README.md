# Fetcher

Fetcher is a Node.js command line application that downloads a file from a given URL and saves it to a local file on your machine.

## Prequisites

- [Node.js](http://nodejs.org) must be installed on your machine

## Installation

1. Clone this repository or downlaod the script file.
2. Install dependencies by running the following command in your terminal:

```
npm install request readline
```

## Usage

To use the fetcher application, run the following command in your terminal:

```
node fetcher.js <url> <file-path>
```

Replace `<url>` with the URL of the file you want to download and `<file-path>` with the local file path where you want to save the downloaded file.

If the file path already exists, the application will prompt you to confrim if you want to overwrite the existing file.
