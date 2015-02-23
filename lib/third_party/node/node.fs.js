/**
 * @name node.fs
 * @namespace
 * File I&#47;O is provided by simple wrappers around standard POSIX functions.  To
 * use this module do <code>require('fs')</code>. All the methods have asynchronous and
 * synchronous forms.
 *
 * The asynchronous form always take a completion callback as its last argument.
 * The arguments passed to the completion callback depend on the method, but the
 * first argument is always reserved for an exception. If the operation was
 * completed successfully, then the first argument will be <code>null</code> or <code>undefined</code>.
 *
 * Here is an example of the asynchronous version:
 * <pre>
 *     var fs = require('fs');
 *
 *     fs.unlink('&#47;tmp&#47;hello', function (err) {
 *       if (err) throw err;
 *       console.log('successfully deleted &#47;tmp&#47;hello');
 *     });
 * </pre>
 * Here is the synchronous version:
 * <pre>
 *     var fs = require('fs');
 *
 *     fs.unlinkSync('&#47;tmp&#47;hello')
 *     console.log('successfully deleted &#47;tmp&#47;hello');
 * </pre>
 * With the asynchronous methods there is no guaranteed ordering. So the
 * following is prone to error:
 * <pre>
 *     fs.rename('&#47;tmp&#47;hello', '&#47;tmp&#47;world', function (err) {
 *       if (err) throw err;
 *       console.log('renamed complete');
 *     });
 *     fs.stat('&#47;tmp&#47;world', function (err, stats) {
 *       if (err) throw err;
 *       console.log('stats: ' + JSON.stringify(stats));
 *     });
 * </pre>
 * It could be that <code>fs.stat</code> is executed before <code>fs.rename</code>.
 * The correct way to do this is to chain the callbacks.
 * <pre>
 *     fs.rename('&#47;tmp&#47;hello', '&#47;tmp&#47;world', function (err) {
 *       if (err) throw err;
 *       fs.stat('&#47;tmp&#47;world', function (err, stats) {
 *         if (err) throw err;
 *         console.log('stats: ' + JSON.stringify(stats));
 *       });
 *     });
 * </pre>
 * In busy processes, the programmer is <em>strongly encouraged</em> to use the
 * asynchronous versions of these calls. The synchronous versions will block
 * the entire process until they complete--halting all connections.
 */

goog.provide("node.fs");

goog.require("node.buffer.Buffer");
goog.require("node.fs.Stats");
goog.require("node.fs.ReadStream");
goog.require("node.fs.WriteStream");

/**
 * Asynchronously reads the entire contents of a file. Example:
 * <pre>
 *     fs.readFile('&#47;etc&#47;passwd', function (err, data) {
 *       if (err) throw err;
 *       console.log(data);
 *     });
 * </pre>
 * The callback is passed two arguments <code>(err, data)</code>, where <code>data</code> is the
 * contents of the file.
 *
 * If no encoding is specified, then the raw buffer is returned.
 * @param {string} path
 * @param {string} encoding_
 */
node.fs.readFile = function(path, encoding_) {
  return node.fs.core_.readFile.apply(node.fs.core_, arguments);
};

/**
 * Synchronous version of <code>fs.readFile</code>. Returns the contents of the <code>filename</code>.
 *
 * If <code>encoding</code> is specified then this function returns a string. Otherwise it
 * returns a buffer.
 * @param {string} path
 * @param {string=} encoding
 */
node.fs.readFileSync = function(path, encoding) {
  return node.fs.core_.readFileSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous close(2).  No arguments other than a possible exception are given
 * to the completion callback.
 * @param {string} fd
 * @param {function(Error=)} callback The callback gets one argument (err). Which is undefined if no error occurred.
 */
node.fs.close = function(fd, callback) {
  return node.fs.core_.close.apply(node.fs.core_, arguments);
};

/**
 * Synchronous close(2).
 * @param {string} fd
 */
node.fs.closeSync = function(fd) {
  return node.fs.core_.closeSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous file open. See open(2). Flags can be 'r', 'r+', 'w', 'w+', 'a',
 * or 'a+'. <code>mode</code> defaults to 0666. The callback gets two arguments <code>(err, fd)</code>.
 * @param {string} path
 * @param {string} flags
 * @param {string} mode
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.open = function(path, flags, mode, callback) {
  return node.fs.core_.open.apply(node.fs.core_, arguments);
};

/**
 * Synchronous open(2).
 * @param {string} path
 * @param {string} flags
 * @param {string} mode
 */
node.fs.openSync = function(path, flags, mode) {
  return node.fs.core_.openSync.apply(node.fs.core_, arguments);
};

/**
 * Read data from the file specified by <code>fd</code>.
 *
 * <code>buffer</code> is the buffer that the data will be written to.
 *
 * <code>offset</code> is offset within the buffer where writing will start.
 *
 * <code>length</code> is an integer specifying the number of bytes to read.
 *
 * <code>position</code> is an integer specifying where to begin reading from in the file.
 * If <code>position</code> is <code>null</code>, data will be read from the current file position.
 *
 * The callback is given the two arguments, <code>(err, bytesRead)</code>.
 * @param {string} fd
 * @param {node.buffer.Buffer} buffer
 * @param {number} offset
 * @param {number} length
 * @param {number} position
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.read = function(fd, buffer, offset, length, position, callback) {
  return node.fs.core_.read.apply(node.fs.core_, arguments);
};

/**
 * Synchronous version of string-based <code>fs.read</code>. Returns the number of
 * <code>bytesRead</code>.
 * @param {string} fd
 * @param {node.buffer.Buffer} buffer
 * @param {number} offset
 * @param {number} length
 * @param {number} position
 */
node.fs.readSync = function(fd, buffer, offset, length, position) {
  return node.fs.core_.readSync.apply(node.fs.core_, arguments);
};

/**
 * Write <code>buffer</code> to the file specified by <code>fd</code>.
 *
 * <code>offset</code> and <code>length</code> determine the part of the buffer to be written.
 *
 * <code>position</code> refers to the offset from the beginning of the file where this data
 * should be written. If <code>position</code> is <code>null</code>, the data will be written at the
 * current position.
 * See pwrite(2).
 *
 * The callback will be given two arguments <code>(err, written)</code> where <code>written</code>
 * specifies how many <em>bytes</em> were written.
 * @param {string} fd
 * @param {node.buffer.Buffer} buffer
 * @param {number} offset
 * @param {number} length
 * @param {number} position
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.write = function(fd, buffer, offset, length, position, callback) {
  return node.fs.core_.write.apply(node.fs.core_, arguments);
};

/**
 * Synchronous version of string-based <code>fs.write()</code>. Returns the number of bytes
 * written.
 * @param {string} fd
 * @param {node.buffer.Buffer} buffer
 * @param {number} offset
 * @param {number} length
 * @param {number} position
 */
node.fs.writeSync = function(fd, buffer, offset, length, position) {
  return node.fs.core_.writeSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous rename(2). No arguments other than a possible exception are given
 * to the completion callback.
 * @param {string} oldPath
 * @param {string} newPath
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.rename = function(oldPath, newPath, callback) {
  return node.fs.core_.rename.apply(node.fs.core_, arguments);
};

/**
 * Synchronous rename(2).
 * @param {string} oldPath
 * @param {string} newPath
 */
node.fs.renameSync = function(oldPath, newPath) {
  return node.fs.core_.renameSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous ftruncate(2). No arguments other than a possible exception are
 * given to the completion callback.
 * @param {string} fd
 * @param {string} len
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.truncate = function(fd, len, callback) {
  return node.fs.core_.truncate.apply(node.fs.core_, arguments);
};

/**
 * Synchronous ftruncate(2).
 * @param {string} fd
 * @param {string} len
 */
node.fs.truncateSync = function(fd, len) {
  return node.fs.core_.truncateSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous rmdir(2). No arguments other than a possible exception are given
 * to the completion callback.
 * @param {string} path
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.rmdir = function(path, callback) {
  return node.fs.core_.rmdir.apply(node.fs.core_, arguments);
};

/**
 * Synchronous rmdir(2).
 * @param {string} path
 */
node.fs.rmdirSync = function(path) {
  return node.fs.core_.rmdirSync.apply(node.fs.core_, arguments);
};

/**
 * @param {string} fd
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.fdatasync = function(fd, callback) {
  return node.fs.core_.fdatasync.apply(node.fs.core_, arguments);
};

/**
 * @param {string} fd
 */
node.fs.fdatasyncSync = function(fd) {
  return node.fs.core_.fdatasyncSync.apply(node.fs.core_, arguments);
};

/**
 * @param {string} fd
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.fsync = function(fd, callback) {
  return node.fs.core_.fsync.apply(node.fs.core_, arguments);
};

/**
 * @param {string} fd
 */
node.fs.fsyncSync = function(fd) {
  return node.fs.core_.fsyncSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous mkdir(2). No arguments other than a possible exception are given
 * to the completion callback.
 * @param {string} path
 * @param {string} mode
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.mkdir = function(path, mode, callback) {
  return node.fs.core_.mkdir.apply(node.fs.core_, arguments);
};

/**
 * Synchronous mkdir(2).
 * @param {string} path
 * @param {string} mode
 */
node.fs.mkdirSync = function(path, mode) {
  return node.fs.core_.mkdirSync.apply(node.fs.core_, arguments);
};

/**
 * @param {string} outFd
 * @param {string} inFd
 * @param {number} inOffset
 * @param {number} length
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.sendfile = function(outFd, inFd, inOffset, length, callback) {
  return node.fs.core_.sendfile.apply(node.fs.core_, arguments);
};

/**
 * @param {string} outFd
 * @param {string} inFd
 * @param {number} inOffset
 * @param {number} length
 */
node.fs.sendfileSync = function(outFd, inFd, inOffset, length) {
  return node.fs.core_.sendfileSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous readdir(3).  Reads the contents of a directory.
 * The callback gets two arguments <code>(err, files)</code> where <code>files</code> is an array of
 * the names of the files in the directory excluding <code>'.'</code> and <code>'..'</code>.
 * @param {string} path
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.readdir = function(path, callback) {
  return node.fs.core_.readdir.apply(node.fs.core_, arguments);
};

/**
 * Synchronous readdir(3). Returns an array of filenames excluding <code>'.'</code> and
 * <code>'..'</code>.
 * @param {string} path
 */
node.fs.readdirSync = function(path) {
  return node.fs.core_.readdirSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous fstat(2). The callback gets two arguments <code>(err, stats)</code> where
 * <code>stats</code> is a <code>fs.Stats</code> object.
 * @param {string} fd
 * @param {function(Error?,node.fs.Stats)=} callback
 */
node.fs.fstat = function(fd, callback) {
  return node.fs.core_.fstat.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous lstat(2). The callback gets two arguments <code>(err, stats)</code> where
 * <code>stats</code> is a <code>fs.Stats</code> object. lstat() is identical to stat(), except that if
 * path is a symbolic link, then the link itself is stat-ed, not the file that it
 * refers to.
 * @param {string} path
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.lstat = function(path, callback) {
  return node.fs.core_.lstat.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous stat(2). The callback gets two arguments <code>(err, stats)</code> where
 * <code>stats</code> is a <code>fs.Stats</code> object. It looks like this:
 * <pre>
 *     { dev: 2049,
 *       ino: 305352,
 *       mode: 16877,
 *       nlink: 12,
 *       uid: 1000,
 *       gid: 1000,
 *       rdev: 0,
 *       size: 4096,
 *       blksize: 4096,
 *       blocks: 8,
 *       atime: '2009-06-29T11:11:55Z',
 *       mtime: '2009-06-29T11:11:40Z',
 *       ctime: '2009-06-29T11:11:40Z' }
 * </pre>
 * See the <code>fs.Stats</code> section below for more information.
 * @param {string} path
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.stat = function(path, callback) {
  return node.fs.core_.stat.apply(node.fs.core_, arguments);
};

/**
 * Synchronous fstat(2). Returns an instance of <code>fs.Stats</code>.
 * @param {string} fd
 * @return {node.fs.Stats}
 */
node.fs.fstatSync = function(fd) {
  return node.fs.core_.fstatSync.apply(node.fs.core_, arguments);
};

/**
 * Synchronous lstat(2). Returns an instance of <code>fs.Stats</code>.
 * @param {string} path
 */
node.fs.lstatSync = function(path) {
  return node.fs.core_.lstatSync.apply(node.fs.core_, arguments);
};

/**
 * Synchronous stat(2). Returns an instance of <code>fs.Stats</code>.
 * @param {string} path
 */
node.fs.statSync = function(path) {
  return node.fs.core_.statSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous readlink(2). The callback gets two arguments <code>(err,
 * resolvedPath)</code>.
 * @param {string} path
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.readlink = function(path, callback) {
  return node.fs.core_.readlink.apply(node.fs.core_, arguments);
};

/**
 * Synchronous readlink(2). Returns the resolved path.
 * @param {string} path
 */
node.fs.readlinkSync = function(path) {
  return node.fs.core_.readlinkSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous symlink(2). No arguments other than a possible exception are given
 * to the completion callback.
 * @param {string} destination
 * @param {string} path
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.symlink = function(destination, path, callback) {
  return node.fs.core_.symlink.apply(node.fs.core_, arguments);
};

/**
 * Synchronous symlink(2).
 * @param {string} destination
 * @param {string} path
 */
node.fs.symlinkSync = function(destination, path) {
  return node.fs.core_.symlinkSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous link(2). No arguments other than a possible exception are given to
 * the completion callback.
 * @param {string} srcpath
 * @param {string} dstpath
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.link = function(srcpath, dstpath, callback) {
  return node.fs.core_.link.apply(node.fs.core_, arguments);
};

/**
 * Synchronous link(2).
 * @param {string} srcpath
 * @param {string} dstpath
 */
node.fs.linkSync = function(srcpath, dstpath) {
  return node.fs.core_.linkSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous unlink(2). No arguments other than a possible exception are given
 * to the completion callback.
 * @param {string} path
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.unlink = function(path, callback) {
  return node.fs.core_.unlink.apply(node.fs.core_, arguments);
};

/**
 * Synchronous unlink(2).
 * @param {string} path
 */
node.fs.unlinkSync = function(path) {
  return node.fs.core_.unlinkSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous chmod(2). No arguments other than a possible exception are given
 * to the completion callback.
 * @param {string} path The path to change mode on
 * @param {string=} mode mode defaults to 0666
 * @param {function(Error=)=} callback The callback gets one argument (err). Which is undefined if no error occurred.
 */
node.fs.chmod = function(path, mode, callback) {
  return node.fs.core_.chmod.apply(node.fs.core_, arguments);
};

/**
 * Synchronous chmod(2).
 * @param {string} path The path to change mode on
 * @param {string} mode mode defaults to 0666
 */
node.fs.chmodSync = function(path, mode) {
  return node.fs.core_.chmodSync.apply(node.fs.core_, arguments);
};

/**
 * @param {string} path The path to change owners on
 * @param {string} uid The user id
 * @param {string} gid The group id
 * @param {function(Error=)} callback The callback gets one argument (err). Which is undefined if no error occurred.
 */
node.fs.chown = function(path, uid, gid, callback) {
  return node.fs.core_.chown.apply(node.fs.core_, arguments);
};

/**
 * @param {string} path
 * @param {string} uid
 * @param {string} gid
 */
node.fs.chownSync = function(path, uid, gid) {
  return node.fs.core_.chownSync.apply(node.fs.core_, arguments);
};

/**
 * @param {string} path
 * @param {string} atime
 * @param {string} mtime
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.utimes = function(path, atime, mtime, callback) {
  return node.fs.core_.utimes.apply(node.fs.core_, arguments);
};

/**
 * Change file timestamps.
 * @param {string} path
 * @param {string} atime
 * @param {string} mtime
 */
node.fs.utimesSync = function(path, atime, mtime) {
  return node.fs.core_.utimesSync.apply(node.fs.core_, arguments);
};

/**
 * @param {string} fd
 * @param {string} atime
 * @param {string} mtime
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.futimes = function(fd, atime, mtime, callback) {
  return node.fs.core_.futimes.apply(node.fs.core_, arguments);
};

/**
 * Change file timestamps with the difference that if filename refers to a
 * symbolic link, then the link is not dereferenced.
 * @param {string} fd
 * @param {string} atime
 * @param {string} mtime
 */
node.fs.futimesSync = function(fd, atime, mtime) {
  return node.fs.core_.futimesSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronously writes data to a file. <code>data</code> can be a string or a buffer.
 *
 * Example:
 * <pre>
 *     fs.writeFile('message.txt', 'Hello Node', function (err) {
 *       if (err) throw err;
 *       console.log('It\'s saved!');
 *     });
 * </pre>
 * @param {string} path
 * @param {string} data
 * @param {string} encoding_
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.writeFile = function(path, data, encoding_, callback) {
  return node.fs.core_.writeFile.apply(node.fs.core_, arguments);
};

/**
 * The synchronous version of <code>fs.writeFile</code>.
 * @param {string} path
 * @param {string} data
 * @param {string=} encoding
 */
node.fs.writeFileSync = function(path, data, encoding) {
  return node.fs.core_.writeFileSync.apply(node.fs.core_, arguments);
};

/**
 * Watch for changes on <code>filename</code>. The callback <code>listener</code> will be called each
 * time the file is accessed.
 *
 * The second argument is optional. The <code>options</code> if provided should be an object
 * containing two members a boolean, <code>persistent</code>, and <code>interval</code>, a polling
 * value in milliseconds. The default is <code>{ persistent: true, interval: 0 }</code>.
 *
 * The <code>listener</code> gets two arguments the current stat object and the previous
 * stat object:
 * <pre>
 *     fs.watchFile(f, function (curr, prev) {
 *       console.log('the current mtime is: ' + curr.mtime);
 *       console.log('the previous mtime was: ' + prev.mtime);
 *     });
 * </pre>
 * These stat objects are instances of <code>fs.Stat</code>.
 *
 * If you want to be notified when the file was modified, not just accessed
 * you need to compare <code>curr.mtime</code> and `prev.mtime.
 * @param {string} filename
 */
node.fs.watchFile = function(filename) {
  return node.fs.core_.watchFile.apply(node.fs.core_, arguments);
};

/**
 * Stop watching for changes on <code>filename</code>.
 * @param {string} filename
 */
node.fs.unwatchFile = function(filename) {
  return node.fs.core_.unwatchFile.apply(node.fs.core_, arguments);
};

/**
 * Synchronous realpath(2). Returns the resolved path.
 * @param {string} p
 * @param {string=} cache
 */
node.fs.realpathSync = function(p, cache) {
  return node.fs.core_.realpathSync.apply(node.fs.core_, arguments);
};

/**
 * Asynchronous realpath(2).  The callback gets two arguments <code>(err,
 * resolvedPath)</code>.
 * @param {string} p
 * @param {string=} cache
 * @param {function(Error?,...[*]):undefined=} cb
 */
node.fs.realpath = function(p, cache, cb) {
  return node.fs.core_.realpath.apply(node.fs.core_, arguments);
};

/**
 * @param {string} path
 * @param {{flags:string,encoding:string,mode:string,bufferSize:number}=} options
 * @return {node.fs.ReadStream}
 */
node.fs.createReadStream = function(path, options) {
  return node.fs.core_.createReadStream.apply(node.fs.core_, arguments);
};

/**
 * @param {string} path
 * @param {{flags:string,encoding:string,mode:string,bufferSize:number}=} options
 * @return {node.fs.WriteStream}
 */
node.fs.createWriteStream = function(path, options) {
  return node.fs.core_.createWriteStream.apply(node.fs.core_, arguments);
};

/**
 * Test whether or not the given path exists.  Then, call the <code>callback</code> argument
 * with either true or false. Example:
 * <pre>
 *     fs.exists('&#47;etc&#47;passwd', function (exists) {
 *       util.debug(exists ? "it's there" : "no passwd!");
 *     });
 * </pre>
 * @param {string} path
 * @param {function(Error?,...[*]):undefined=} callback
 */
node.fs.exists = function(path, callback) {
  return node.fs.core_.exists.apply(node.fs.core_, arguments);
};

/**
 * Synchronous version of <code>fs.exists</code>.
 * @param {string} path
 */
node.fs.existsSync = function(path) {
  return node.fs.core_.existsSync.apply(node.fs.core_, arguments);
};

/**
 * @private
 * @type {*}
 */
node.fs.core_ = require("fs");