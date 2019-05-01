import React, { useCallback, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/SaveRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';
import MoveVertIcon from '@material-ui/icons/MoreVertRounded';

import { mapMuiFormikdProps } from '../../lib/muiFormik';
import { getStyles } from '../../styles/jss/page/page';

// Components
import Note from '../note/note';
import MatSimpleTags from '../common/matSimpleTags';

export interface IPageData {
  title: string;
  subtitle: string;
}

export default function Page() {
  const classes = makeStyles(getStyles)();
  const titleBarRef = useRef<HTMLDivElement>(null);
  const pageTitlePortalElem = useRef(document.createElement('div'));

  useEffect(() => {
    // Insert page title field portal into page title element
    titleBarRef.current.insertBefore(pageTitlePortalElem.current.children[0], titleBarRef.current.children[0]);
  }, []);

  const getInitialValues = useCallback((): IPageData => ({
    title: '',
    subtitle: ''
  }), []);

  return (
    <Paper className={classes.root}>
      <div ref={titleBarRef} className={classes.pageTitle}>
        <Fab color="default" className={classes.closeBtn}>
          <CloseIcon className={classes.closeBtnIcon} />
        </Fab>
      </div>
      <div className="d-flex">
        <section className={classes.pageInfoSection}>
          <Formik initialValues={getInitialValues()} onSubmit={(...args) => console.log(args)}>
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form className={classes.pageInfoForm} onSubmit={handleSubmit}>
                {/* This first element goes at title bar */}
                {ReactDOM.createPortal(
                  <TextField label="Page title" className="mb-2" fullWidth margin="dense"
                    {...mapMuiFormikdProps('title', values, errors, touched)} onChange={handleChange} />
                  , pageTitlePortalElem.current)}

                <MatSimpleTags />

                <div className={classes.pageInfoFooter}>
                  <div className={classes.pageOptionBtns}>
                    <Button className={classes.saveBtn} size="small" variant="contained" color="primary" type="button">
                      <SaveIcon fontSize="small" />&nbsp;Save
                    </Button>
                    <IconButton className={classes.optionsBtn} color="default">
                      <MoveVertIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </section>
        <section className={classes.notesSection}>
          <Note />
        </section>
      </div>
    </Paper>
  );
}