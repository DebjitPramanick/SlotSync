import * as Styles from "./index.styled";

const UserSearchBox = ({
  userQuery,
  selectedParticipant,
  fetchParticipantsByQueryRequestState,
  onChangeQuery,
  onSelectParticipant,
  ...rest
}) => {
  const handleSelectParticipant = (participant) => {
    onSelectParticipant(participant);
  };

  let resultsNode;

  if (fetchParticipantsByQueryRequestState.fulfilled && !selectedParticipant) {
    const results = fetchParticipantsByQueryRequestState.data;
    resultsNode = (
      <Styles.ResultsList>
        {results.length ? (
          results.map((result) => (
            <Styles.ResultsItem
              key={result.id}
              onClick={() => {
                handleSelectParticipant(result);
              }}
            >
              {result.name}
            </Styles.ResultsItem>
          ))
        ) : (
          <Styles.NoResultMessage>No user found</Styles.NoResultMessage>
        )}
      </Styles.ResultsList>
    );
  }

  return (
    <Styles.Root {...rest}>
      <Styles.UserSearchInput
        value={userQuery}
        onChange={onChangeQuery}
        placeholder="Search participant ..."
      />
      {resultsNode}
    </Styles.Root>
  );
};

export default UserSearchBox;
