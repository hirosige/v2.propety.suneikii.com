import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import securePage from '../../hocs/securePage';

const GET_REPOS = gql`
  {
    viewer {
      repositories(first: 100) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

const Repositories = () => {
  return (
    <Query query={GET_REPOS} ssr>
      {(props) => {
        if (props.loading) {
          return 'Loading...';
        } else {
          const repos = props.data.viewer.repositories.edges;

          return (
            <div>
              <ul>
                {repos.map((repo) => {
                  return (
                    <li key={repo.node.id}>
                      <span className="badge">{ repo.node.name }</span>
                      { repo.node.id }
                    </li>
                  );
                })}
              </ul>

              <style jsx>
                {`
                  ul {
                    list-style: none;
                  }

                  li {
                    font-size: 1.2rem;
                    background: #444444;
                    color: #ffffff;
                    padding: 10px;
                    width: 500px;
                  }

                  li + li {
                    border-top: 1px solid #ffffff;
                  }

                  .badge {
                    border: 1px solid #444444;
                    padding: 3px 5px 3px;
                    background: #ffffff;
                    color: #444444;
                    font-weight: bold;
                  }
                `}
              </style>
            </div>
          );
        }
      }}
    </Query>
  );
};

Repositories.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.shape({
    viewer: PropTypes.shape({
      repositories: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
  }),
};

Repositories.defaultProps = {
  loading: false,
  data: {},
};

export default securePage(Repositories);
