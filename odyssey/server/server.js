const express = require('express');
const app = express();
const { jwtSecret } = require('./config/config');
const config = require('./config/config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('./auth/auth');

const { port } = config;

// Middleware
app.use(express.json({ extended: false }));

// Database
const connection = require('./config/connection');

//TODO: Set up view all sessions route

// Models
const Account = require('./models/Account');
const Subject = require('./models/Subject');
const Session = require('./models/Session');
const Note = require('./models/Note');
const { findOne, findById } = require('./models/Account');

// PUBLIC ROUTES
// sign-in and sign-out routes

app.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  // search for user based email entered
  try {
    let account = await Account.findOne({ email: email });

    // If we don't find the user, send 400 error message
    if (!account) {
      return res.status(400).json({ success: false, error: 'Account not found' });
    }

    // If we do find a user, compare the hashed password with the password for the found user
    const isMatch = await bcrypt.compare(password, account.password);

    // If they are not same, send 401 error message
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Incorrect password' });
    }

    // If account found and password correct create a payload
    const payload = {
      account: {
        id: account.id,
      },
    };

    // Sign the user token
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        // If no errors occurred, send 200 with the token and user account
        res.status(200).json({ success: true, token, id: account._id, username: account.username, email: account.email, avatar: account.avatar });
      }
    );
  } catch (err) {
    // If a server side error occurs, log it for debugging and send 500 error message
    console.log('\n___________Error when attempting to sign in a user___________');
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   POST /sign-up
// @desc    Sign up a new user
// @access  public
app.post('/sign-up', async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    let account = await Account.findOne({ email });
    // If the account already exists send 400 error message
    if (account) {
      return res.status(400).json({ success: false, msg: 'Account already exists.' });
    }

    // If the account does not exist, create it
    account = new Account({
      username,
      email,
      password,
      avatar,
    });
    const salt = await bcrypt.genSalt(10);
    // Set the user password property to the hashed value
    account.password = await bcrypt.hash(password, salt);
    await account.save();

    // Once the account is created and saved to database, create a payload
    const payload = {
      account: {
        id: account.id,
      },
    };

    // Sign the user token
    jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        throw err;
      }
      // If no errors occurred, send 200 with the signed token and user account
      res.status(201).json({ success: true, token, id: account._id, username: account.username, email: account.email, avatar: account.avatar });
    });
  } catch (err) {
    // If a server side error occurs, log it for debugging and send 500 error message
    console.log('\n___________Error when signing up new user___________');
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PROTECTED ROUTES

// Session Routes _____________________________________________________

// @route   GET /view-session:id
// @desc    Gets a single session based on the request session id
// @private

app.get('/view-session/?', auth, async (req, res) => {
  try {
    const session = await Session.findById(req.query.sessionid);
    if (session === null) {
      return res.status(404).json({ sucess: false, error: 'This coding session could not be found' });
    }
    let result = await session.populate('owner', 'username').populate('subject', 'name').populate('strength', 'text').populate('opportunity', 'text').execPopulate();
    let resultNotes = await Note.find({ session: req.query.sessionid });
    result.notes = resultNotes.filter((noteObj) => noteObj.noteType === 0);
    return res.status(200).json({ success: true, session: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// @route   GET  /view-sessions/:id
// @desc    Gets all sessions created by an account based on the request id
// @private

app.get('/view-sessions/?', auth, async (req, res) => {
  try {
    // Grab the user account associated with the id sent in the request query
    let account = await Account.findOne({ _id: req.query.id });

    // If we do not find the user, send 404
    if (account === null) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    console.log(account._id);

    // Get all sessions associated with this user account
    let allSessions = await Session.find({ owner: account._id }).populate('notes', 'text').populate('opportunity', 'text').populate('strength', 'text').populate('subject');
    console.log(allSessions);

    return res.status(200).json({ success: true, sessions: allSessions });
  } catch (err) {
    // If a server side error occurs, log it for debugging and send 500 error message
    console.log("\n___________Error when viewing a user's sessions___________");
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route     POST /add-session
// @desc      Adds a study session to the database
// @private

app.post('/add-session', auth, async (req, res) => {
  const { subjectName, ownerName, date, duration, title, method, strength, opportunity, comprehensionRating, satisfactionRating, successRating, notes } = req.body;
  try {
    // If the subject does not exist create it
    let subject = await Subject.findOne({ name: subjectName });
    if (!subject) {
      newSubject = new Subject({
        name: subjectName,
        img: '/img/subjects/placeholder.png',
      });
      subject = await newSubject.save();
    }

    // Get the Account id of the person creating the session
    let owner = await Account.findOne({ username: ownerName });

    // Create the new session
    session = new Session({
      subject: subject._id,
      owner: owner._id,
      date,
      duration,
      title,
      method,
      comprehensionRating,
      satisfactionRating,
      successRating,
    });

    let newSession = await session.save();

    // If the user entered a strength, create it as a note
    if (strength) {
      strengthNote = new Note({
        subject: subject._id,
        account: owner._id,
        session: newSession._id,
        noteType: 2,
        text: strength,
      });
      newStrength = await strengthNote.save();
      newSession.strength = newStrength._id;
    }

    // If the user entered a opportunity, create it as a note
    if (opportunity) {
      opportunityNote = new Note({
        subject: subject._id,
        account: owner._id,
        session: newSession._id,
        noteType: 1,
        text: opportunity,
      });
      newOpportunity = await opportunityNote.save();
      newSession.opportunity = newOpportunity._id;
    }
    newSession = await newSession.save();
    res.status(201).json({ success: true, entry: newSession });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// @route     PUT /modify-session
// @desc      Allows user to change the duration or date or rankings of the session
// @private

app.put('/modify-session', auth, async (req, res) => {
  const { sessionid, date, duration, title, method, comprehensionRating, satisfactionRating, successRating } = req.body;

  try {
    // Grab the original session object
    const original = await Session.findOne({ _id: sessionid });

    // If the session is not found, send a 404 to the user
    if (original === null) {
      return res.status(404).json({ success: false, error: 'The specified session was not found and could not be modified' });
    }

    // Create an object containing the new value for all items.  If the value has not changed, include the value from the original object
    const updateFields = {
      date: date ? date : original.date,
      duration: duration ? duration : original.duration,
      title: title ? title : original.title,
      method: method ? method : original.method,
      comprehensionRating: comprehensionRating ? comprehensionRating : original.comprehensionRating,
      satisfactionRating: satisfactionRating ? satisfactionRating : original.satisfactionRating,
      successRating: successRating ? successRating : original.successRating,
    };

    // Find the session using the id and update the values
    const session = await Session.findOneAndUpdate({ _id: sessionid }, updateFields, { new: true });

    // Send the user the modified session
    res.status(200).json({ success: true, session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// @route   DELETE /delete-session
// @desc    Deletes a session based on the id
// @private

app.delete('/delete-session', auth, async (req, res) => {
  const { id } = req.body;

  try {
    deletedSession = await Session.findOneAndDelete({ _id: id });
    deletedNotes = await Note.deleteMany({ session: deletedSession._id });
    res.status(200).json({ success: true, deletedSession, deletedNotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// Protected Other Routes _______________________________________________________________

// @route   POST /modify-account
// @desc    allows users to change their password or avatar
// @private

app.post('/modify-account', auth, async (req, res) => {
  const { email, originalPassword, newPassword, newAvatar } = req.body;
  let pwChange = false;

  try {
    let account = await Account.findOne({ email });

    if (!account) {
      return res.status(400).json({ success: false, error: 'Account not found' });
    }

    if (originalPassword !== null) {
      const isMatch = await bcrypt.compare(originalPassword, account.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Incorrect password' });
      }

      const salt = await bcrypt.genSalt(10);
      account.password = await bcrypt.hash(newPassword, salt);
      pwChange = true;
    }
    if (newAvatar !== null) {
      account.avatar = newAvatar;
      avatarChange = true;
    }

    if (pwChange) {
      password = 'The account password has been updated';
    } else {
      password = 'The account password has not changed';
    }

    await account.save();
    return res.status(200).json({ success: true, account: { _id: account._id, username: account.username, email: account.email, avatar: account.avatar }, password });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// @route   POST /add-subject
// @desc    adds a subject to the database
// @private

app.post('/add-subject', auth, async (req, res) => {
  const { name, img } = req.body;

  try {
    subject = await Subject.findOne({ name: name });

    // Check if the subject already exists and send 400 error message
    if (subject) {
      return res.status(400).json({ success: false, error: 'Subject already exists.' });
    }
    // Create the new entry and send 200 with new subject.
    subject = new Subject({ name, img });
    await subject.save();
    return res.status(201).json({ success: true, subject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// @route     POST /add-note
// @desc      Adds a note to the specified session
// @private

app.post('/add-note', auth, async (req, res) => {
  const { account, subject, session, text } = req.body;

  try {
    let noteSession = await Session.findById(session);
    let noteSubject = await Subject.findOne({ name: subject });
    let noteAccount = await Account.findOne({ username: account });

    // Create the Note to add to the database

    newNote = new Note({
      account: noteAccount,
      subject: noteSubject._id,
      noteType: 0,
      session: noteSession._id,
      text,
    });

    noteSession.notes.push(newNote._id);
    notesession = await noteSession.save();
    newNote = await newNote.save();

    res.status(200).json({ success: true, session: noteSession });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// @route   PUT /modify-note
// @desc     Updates an existing note on a subject
// @private

app.put('/modify-note', auth, async (req, res) => {
  const { id, text } = req.body;

  try {
    const modifiedNote = await Note.findOneAndUpdate({ _id: id }, { text }, { new: true });

    // If the note is not found send 404 to the user
    if (modifiedNote === null) {
      res.status(404).json({ success: false, error: 'Note was not found and could not be updated' });
    }

    res.status(200).json({ success: true, note: modifiedNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// @route     DELETE /delete-note
// @desc      Deletes the note and removes it from the session
// @private

app.delete('/delete-note', auth, async (req, res) => {
  const { id } = req.body;

  try {
    deletedNote = await Note.findOne({ _id: id });
    if (deletedNote === null) {
      return res.status(404).json({ success: false, error: 'The note could not be found so nothing was deleted' });
    }
    // Make sure the user is not deleting a strength or Opportunity
    if (deletedNote.noteType !== 0) {
      return res.status(400).json({ success: false, error: "The 'What I did well' and 'Where I can improve' notes cannot be deleted" });
    }

    // Find the object reference in the session's notes array and remove it
    deletedNoteSession = await Session.findOne({ _id: deletedNote.session });
    index = deletedNoteSession.notes.indexOf(deletedNote._id);
    deletedNoteSession.notes.splice(index, 1);
    console.log(deletedNoteSession);
    await deletedNoteSession.save();

    // Delete the note
    deletedNote = await Note.findOneAndDelete({ _id: deletedNote._id });

    // Send the user confirmation, the deleted note and the session
    res.status(200).json({ success: true, session: deletedNoteSession, deletedNote });
  } catch (err) {}
});

// Static Assets

// Server initialization
app.listen(port, () => console.log(`Server listening on port ${port}.`));
