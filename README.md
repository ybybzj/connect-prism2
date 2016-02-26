# connect-prism2
Fork of connect-prism, credit for [connect-prism](https://github.com/seglo/connect-prism)

### Added feature

#### logToFile
```
prism.logToFile({
  filename: 'prism.log',
  maxsize: 1024, //max size in bytes of one logfile, if the size is exceeded then a new file is created
  maxFile: 10 //Limit the number of files created when the size of the logfile is exceeded.
});
```
