import { Item, Menu, useContextMenu } from "react-contexify";

const ContextMenu = <T,>({ id, actions }: WithContextMenuProps<T>) => {
  const { hideAll } = useContextMenu({ id });

  if (actions.length === 0) {
    return null;
  }

  return (
    <Menu id={id}>
      {actions.map((action) => (
        <Item
          key={action.title}
          onClick={({ props }) => {
            action.onClick(props);
            hideAll();
          }}
        >
          {action.title}
        </Item>
      ))}
    </Menu>
  );
};

interface WithContextMenuProps<T> {
  id: string;
  actions: Array<{
    title: string;
    onClick: (props: T) => void;
  }>;
}

export default ContextMenu;
