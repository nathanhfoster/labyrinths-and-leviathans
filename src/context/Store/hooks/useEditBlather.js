/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import dynamic from 'next/dynamic';
import useBooleanToggler from '~lib/utils/Hooks/useBooleanToggler';

const EditBlather = dynamic(() => import('~components/List/Edit/EditBlather'), { ssr: false });

const useEditBlather = ({ item, blather, showEdit }) => {
  const [blatherEditorIsOpen, toggleEditor] = useBooleanToggler(false);

  const showBlatherEditor = () => showEdit && toggleEditor(true);
  const hideBlatherEditor = () => showEdit && toggleEditor(false);
  const blatherEditorLabel = showEdit && !blatherEditorIsOpen && !blather && (
    <span onClick={showBlatherEditor}>Add commentary (optional)</span>
  );
  const blatherEditor = blatherEditorIsOpen && showEdit && (
    <EditBlather listItemData={item} onDone={hideBlatherEditor} />
  );
  return { blatherEditorIsOpen, showBlatherEditor, hideBlatherEditor, blatherEditor, blatherEditorLabel };
};

export default useEditBlather;
