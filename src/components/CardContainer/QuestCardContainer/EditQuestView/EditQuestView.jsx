import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import DeleteQuestModal from '../../../DeleteQuestModal/DeleteQuestModal';
import CompletedModal from '../../../CompletedModal/CompletedModal';
import DifficultySelect from '../../../DifficultySelect/DifficultySelect';
import GroupSelect from '../../../GroupSelect/GroupSelect';
import s from './EditQuestView.module.css';
import dropDownArrow from '../../../../assets/images/icons/drop-down-arrow.png';
import CalendarIcon from '../../../../assets/images/icons/calendarSvg/CalendarSvg';
import SaveSvg from '../../../../assets/images/icons/saveSvg/SaveSvg';
import CloseSvg from '../../../../assets/images/icons/closeSvg/CloseSvg';
import DoneSvg from '../../../../assets/images/icons/doneSvg/DoneSvg';
import { ReactComponent as StarIcon } from '../../../../assets/images/icons/star/favourites-filled-star-symbol.svg';

const PickerInput = (props, openCalendar, closeCalendar) => {
  function clear() {
    props.onChange({ target: { value: '' } });
  }
  return (
    <div>
      <input {...props} />
      <button onClick={openCalendar} className={s.pickerIcon}>
        <CalendarIcon className={s.calendarIcon} />
      </button>
    </div>
  );
};

class EditQuestView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleEnterDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEnterDown);
  }

  handleEnterDown = event => {
    if (event.keyCode === 13) {
      this.props.onSave();
    }
    if (event.keyCode === 27) {
      this.props.toggleDeleteModal();
    }
  };

  render() {
    const {
      difficulty,
      dueDate,
      group,
      toggleIsPriority,
      isPriority,
      name,
      toggleDifficultySelect,
      isOpenDifficultySelect,
      toggleOpenGroupSelect,
      isOpenGroupSelect,
      handelChangeNameQuest,
      handleChangeDueDate,
      handleSaveSelectedDifficutlyItem,
      handleSaveSelectedGroupItem,
      isDeleteModalOpen,
      toggleDeleteModal,
      isCompletedModalOpen,
      toggleCompletedModal,
      onSave,
      onDelete,
      moveToDone,
      toggleIsOpenCalendar,
      isOpenCalendar,
      isQuest
    } = this.props;
    return (
      <div
        className={s.card}
        onClick={isOpenGroupSelect ? toggleOpenGroupSelect : isOpenDifficultySelect ? toggleDifficultySelect : () => {}}
      >
        <header className={s.cardHeader}>
          <div className={s.difficultySelect_container} onClick={toggleDifficultySelect}>
            <DifficultySelect
              handleSaveSelectedDifficutlyItem={handleSaveSelectedDifficutlyItem}
              isOpenDifficultySelect={isOpenDifficultySelect}
              difficulty={difficulty}
            />
            <img className={s.dropDownArrow} src={dropDownArrow} alt="dropDownArrow" />
          </div>
          <div className={s.starContainer} onClick={toggleIsPriority}>
            <StarIcon className={isPriority ? s.starActive : s.starNoActive} />
          </div>
        </header>
        <main className={s.cardMain}>
          <input
            minLength="3"
            required
            autoFocus
            className={s.title}
            onChange={handelChangeNameQuest}
            value={name}
            placeholder="You may change quest name"
          />
          <div className={s.dateTimeContainer}>
            <Datetime
              dateFormat="DD.MM.YYYY"
              onChange={handleChangeDueDate}
              defaultValue={moment(dueDate)}
              open={isOpenCalendar}
              onFocus={toggleIsOpenCalendar}
              locale={window.navigator.language}
              renderInput={PickerInput}
            />
          </div>
        </main>
        <footer className={s.cardFooter}>
          <div className={s.groupsContainer} onClick={toggleOpenGroupSelect}>
            <img className={s.ArrowForGroupSelect} src={dropDownArrow} alt="dropDownArrow" />
            <GroupSelect
              handleSaveSelectedGroupItem={handleSaveSelectedGroupItem}
              isOpenGroupSelect={isOpenGroupSelect}
              group={group}
            />
          </div>
          <div className={s.toolsContainer}>
            <SaveSvg className={s.saveSvg} onClick={onSave} />
            <div className={s.strip} />
            <CloseSvg className={s.closeSvg} onClick={toggleDeleteModal} />
            <div className={s.strip} />
            <DoneSvg className={s.doneSvg} onClick={toggleCompletedModal} />
          </div>
        </footer>

        {isDeleteModalOpen && (
          <DeleteQuestModal isQuest={isQuest} onDelete={onDelete} onCancelDel={toggleDeleteModal} />
        )}
        {isCompletedModalOpen && <CompletedModal isQuest={isQuest} name={name} moveToDone={moveToDone} />}
      </div>
    );
  }
}

EditQuestView.propTypes = {
  isQuest: PropTypes.bool.isRequired,
  isOpenCalendar: PropTypes.bool.isRequired,
  toggleIsOpenCalendar: PropTypes.func.isRequired,
  toggleCompletedModal: PropTypes.func.isRequired,
  isCompletedModalOpen: PropTypes.bool.isRequired,
  toggleDeleteModal: PropTypes.func.isRequired,
  isDeleteModalOpen: PropTypes.bool.isRequired,
  handleSaveSelectedGroupItem: PropTypes.func.isRequired,
  handleSaveSelectedDifficutlyItem: PropTypes.func.isRequired,
  handleChangeDueDate: PropTypes.func.isRequired,
  handelChangeNameQuest: PropTypes.func.isRequired,
  isOpenGroupSelect: PropTypes.bool.isRequired,
  toggleOpenGroupSelect: PropTypes.func.isRequired,
  toggleIsPriority: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  isPriority: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};

export default EditQuestView;
