import meditationPlaceholder from '#assets/img/meditation-image-placeholder.png';
import { Button, Card, Search } from '#libs/components/components.js';
import { DataStatus, IconColor } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useSearch,
  useState,
} from '#libs/hooks/hooks.js';
import { actions as meditationActions } from '#slices/meditation/meditation.js';

import { MeditationModal } from '../meditation-modal/meditation-modal.js';
import styles from './styles.module.scss';

const mockedMeditations = [{ id: 1, name: 'Meditation' }];

const mockedSelectedMeditation = {
  id: 1,
};

const MeditationSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredElements, setFilter } = useSearch(mockedMeditations, 'name');
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const [isReseted, setIsReseted] = useState<boolean>(false);
  const { meditationDataStatus } = useAppSelector(({ meditation }) => {
    return {
      meditationDataStatus: meditation.dataStatus,
    };
  });

  useEffect(() => {
    if (meditationDataStatus === DataStatus.FULFILLED) {
      setIsDisplayed(false);
      setIsReseted(true);
    }
  }, [meditationDataStatus]);

  const handleOpen = useCallback(() => {
    setIsDisplayed(true);
    setIsReseted(false);
  }, [setIsDisplayed]);

  const handleClose = useCallback(() => {
    setIsDisplayed(false);
  }, [setIsDisplayed]);

  const handleSubmit = useCallback(
    (title: string, file: File) => {
      void dispatch(
        meditationActions.createMeditationEntry({
          topicName: title,
          file: file,
        }),
      );
    },
    [dispatch],
  );

  const handleSelectChat = useCallback((id: number) => {
    return () => {
      mockedSelectedMeditation.id = id;
      // TODO redux logic
    };
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['info']}>
          <span>Meditation & Breathing</span>
        </div>
        <div className="icon-container">
          <Button
            label="Open modal"
            isLabelVisuallyHidden={true}
            icon={{ name: 'plus', color: IconColor.BLUE }}
            style="rounded-transparent"
            onClick={handleOpen}
          />
        </div>
      </div>
      <div className={styles['list']}>
        <div className={styles['search']}>
          <Search onValueChange={setFilter} />
        </div>
        <div className={styles['meditation-list']}>
          {filteredElements.map((filteredElement) => {
            return (
              <Card
                title={filteredElement.name}
                imageUrl={meditationPlaceholder}
                onClick={handleSelectChat(filteredElement.id)}
                isActive={mockedSelectedMeditation.id === filteredElement.id}
                key={filteredElement.id}
              />
            );
          })}
        </div>
      </div>

      <MeditationModal
        isDisplayed={isDisplayed}
        isReseted={isReseted}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export { MeditationSidebar };